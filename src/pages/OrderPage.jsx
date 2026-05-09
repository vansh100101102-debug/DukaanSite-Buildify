import OrderForm from '../components/OrderForm'

export default function OrderPage({ isLoggedIn, userEmail, userId, showToast }) {
  return (
    <OrderForm isLoggedIn={isLoggedIn} userEmail={userEmail} userId={userId} showToast={showToast} />
  )
}
