
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const body = await request.json();
    const items = body.items;
    
    let lineItems = [];
    items.forEach(item => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        })
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
    });
    
    return new Response(JSON.stringify({
        url: session.url
    }))
}