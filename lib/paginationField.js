import { PAGINATION_QUERY } from "components/Pagination";
import gql from "graphql-tag";

export default function paginationField() {
    return {
        keyArgs: false, // tell apollo we will take care of everything
        read(existing = [], { args, cache }) {
            // console.log(existing, args, cache)
            const { skip, first } = args;
            // Read the number of items on the page from the cache
            const data = cache.readQuery({query: PAGINATION_QUERY});
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count/first);
            // check if we have existing items
            const items = existing.slice(skip, skip + first).filter(x => x);
            // if there arent enough items to satisfy how many were requested
            // and we are on the last page just send it
            if(items.length && items.length !== first && page === pages) {
                return items
            }
            if(items.length !== first) {
                // we dont have any items, we must go to the network to fetch them
                return false;
            }

            // If there are items just return them from the catch and we dont need to go to the network
            if (items.length) {
                console.log(items.length)
                return items
            }

            return false; // fallback to network

            // First ask the read function for those items
            // we can do two thinks
            // 1 return de items becouse the are already catch
            // 2 the other things we can do is to return false from here
        },
        merge(existing, incoming, { args }) {
            // This runs when the apollo client comes back from the network with our products.
            const { skip, first } = args;
            const merged = existing ? existing.slice(0) : [];
            for (let i = skip; i < skip + incoming.length; ++i ) {
                merged[i] = incoming[i - skip]
            }

            return merged
        }
    }
}