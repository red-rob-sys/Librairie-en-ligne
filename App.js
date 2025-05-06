// Remplacez cette clé publique par votre propre clé Stripe
const stripePublicKey = "pk_test_1234567890abcdef"; 
const stripe = Stripe(stripePublicKey);

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        const priceId = button.getAttribute('data-price-id');
        createCheckoutSession(priceId);
    });
});

function createCheckoutSession(priceId) {
    fetch("https://your-backend-url/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            priceId: priceId
        })
    })
    .then(response => response.json())
    .then(session => {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(error => {
        console.error("Error creating checkout session:", error);
    });
        }
