import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { useState } from "react";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function Search() {
  const router = useRouter();

  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );
  const findItemsDelay = debounce(findItems, 350);
  resetIdCounter();
  const items = data?.searchTerms || [];
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    setInputValue,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      if (inputValue.length >= 2) {
        findItemsDelay({
          variables: {
            searchTerm: inputValue,
          },
        });
      }
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem?.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });
  const [showItems, setShowItems] = useState(isOpen);
  const handleClick = (item) => {
    router.push({
      pathname: `/product/${item?.id}`,
    });
    setShowItems(false)
    setInputValue('')
  };
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: loading ? "loading" : "",
            onChange: () => setShowItems(isOpen)
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {showItems &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
              onClick={() => handleClick(item)}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {showItems && !items.length && !loading && (
          <DropDownItem href="/">
            Sorry, no items found for {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}

export default Search;
