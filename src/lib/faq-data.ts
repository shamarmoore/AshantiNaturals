export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: "Ordering",
    question: "How do I place an order?",
    answer:
      "Simply browse our collection, select your desired product, choose your preferred length and options, then click 'Add to Cart.' When you're ready, proceed to checkout and follow the prompts to complete your purchase. You'll receive an order confirmation email once the order is placed.",
  },
  {
    category: "Ordering",
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "We process orders quickly to ensure fast delivery. If you need to modify or cancel, please contact us within 2 hours of placing your order, or use the order cancellation feature in your account. After the order has been dispatched for delivery, changes may not be possible.",
  },
  {
    category: "Ordering",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard), as well as popular online payment options. All transactions are secured with industry-standard encryption. Prices are listed in JMD (Jamaican Dollars).",
  },
  {
    category: "Ordering",
    question: "Are prices listed in JMD or USD?",
    answer:
      "All prices on our website are listed in JMD (Jamaican Dollars). If you're viewing from outside Jamaica, please use the current exchange rate for an estimate.",
  },
  {
    category: "Delivery",
    question: "Where do you deliver?",
    answer:
      "We currently deliver island-wide across Jamaica. Whether you're in Kingston, Montego Bay, Ocho Rios, Mandeville, or any parish in between — we'll get your order to you.",
  },
  {
    category: "Delivery",
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by location. Kingston & St. Andrew typically receive orders within 1–3 business days. Other parishes across the island can expect delivery within 3–5 business days. Processing time is 1–2 business days before dispatch.",
  },
  {
    category: "Delivery",
    question: "How much does delivery cost?",
    answer:
      "Delivery fees vary based on your location. Orders within the Kingston Metropolitan Area have a flat delivery rate, while islandwide delivery rates vary by parish. Free delivery may be available on orders over a certain amount — check the checkout page for details.",
  },
  {
    category: "Delivery",
    question: "Do you ship internationally?",
    answer:
      "We are currently focused on serving our Jamaican customers with island-wide delivery. We plan to expand to the United States and other international markets in the near future. Sign up for our newsletter to be the first to know when international shipping becomes available.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery for unused and unaltered items in their original packaging. Custom-coloured items are final sale. To initiate a return, contact our support team with your order number and reason for return.",
  },
  {
    category: "Returns",
    question: "How do I exchange a product?",
    answer:
      "To exchange a product, please contact our customer service team. We'll guide you through the process. Once we receive and inspect the returned item, we'll send your replacement. Exchanges are subject to availability.",
  },
  {
    category: "Hair Care",
    question: "How should I wash my human hair wig or extensions?",
    answer:
      "Gently detangle with a wide-tooth comb before washing. Use sulfate-free shampoo with lukewarm water, washing in a downward motion. Apply a deep conditioner for 10–15 minutes, then rinse with cool water to seal the cuticles. Air dry on a wig stand when possible.",
  },
  {
    category: "Hair Care",
    question: "Can I use heat styling tools on human hair?",
    answer:
      "Yes! Our 100% human hair products can be styled with heat tools. However, we recommend using a heat protectant spray and keeping the temperature below 350°F (180°C) to maintain the hair's longevity and natural lustre.",
  },
  {
    category: "Hair Care",
    question: "How long will my human hair wig or extensions last?",
    answer:
      "With proper care, our premium human hair products can last 12–18 months or longer. The key is regular conditioning, gentle handling, proper storage on a wig stand or in a satin bag, and minimising excessive heat styling.",
  },
];

export const FAQ_CATEGORIES = ["All", "Ordering", "Delivery", "Returns", "Hair Care"];
