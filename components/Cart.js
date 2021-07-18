import CartStyles from "components/styles/CartStyles";
import calcTotalPrice from "lib/calcTotalPrice";
import { useCart } from "lib/cartState";
import formatMoney from "lib/formatMoney";
import styled from "styled-components";
import RemoveFromCart from "./RemoveFromCart";
import CloseButton from "./styles/CloseButton";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid var(--lightGrey);
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 1rem;

    }
    h3,
    p {
        margin: 0;
    }
    span {
        font-size: 12px;
        margin: 0;
    }
`;

const CartItem = ({cartItem}) => {
    const product = cartItem.product;
    if(!product) return null;
    if(cartItem.quantity === 0) return null;
    return (
        <CartItemStyles>
            <img width="150" height="100" src={product.photo.image.publicUrlTransformed} alt={product.name}/>
            <div>
                <h3>{product.name}</h3>
                <span>{cartItem.quantity} x {formatMoney(product.price )}</span><br/>
                <em>{formatMoney(product.price * cartItem.quantity)}</em>
                
            </div>
            <RemoveFromCart id={product.id} quantity={cartItem.quantity}/>
        </CartItemStyles>
    );
}

function Cart() {
    const me = useUser();
    const { cartOpen, closeCart } = useCart();
    if(!me) return null;
    return (
        <CartStyles open={cartOpen} >
            <header>
                <Supreme>{me.name}'s Cart</Supreme>
                <CloseButton onClick={closeCart} >x</CloseButton>
            </header>
            <ul>
                {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            </footer>
        </CartStyles>
    );
}

export default Cart;