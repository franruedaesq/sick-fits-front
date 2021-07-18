import { useCart } from "lib/cartState";
import Link from "next/link";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";
function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount count={user.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
          </button>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign in</Link>
        </>
      )}
    </NavStyles>
  );
}

export default Nav;
