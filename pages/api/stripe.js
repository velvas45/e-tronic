import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LDQ7sFrWQRyufUmJ6F1xwjV" },
          { shipping_rate: "shr_1LDQ76FrWQRyufUmJk8cDqJY" },
          { shipping_rate: "shr_1LDQ61FrWQRyufUm9gZzwVsy" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/fa8vrx9s/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "idr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
        shipping_address_collection: {
          allowed_countries: ["ID", "US"],
        },
        phone_number_collection: {
          enabled: true,
        },
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      //   res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
