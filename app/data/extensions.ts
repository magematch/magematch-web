export type Extension = {
  name: string;
  description: string;
  repoUrl: string;
  stars: number;
};

export const extensions: Extension[] = [
  {
    name: "Magento 2 Payment",
    description:
      "Payment processing, retry logic, and GraphQL integration for Adyen payment methods and webhooks.",
    repoUrl: "https://github.com/arjundhi/magento2-payment",
    stars: 0,
  },
  {
    name: "Magento 2 Email",
    description:
      "Branded transactional email templates and notification enhancements for core Magento customer and sales flows.",
    repoUrl: "https://github.com/arjundhi/magento2-email",
    stars: 0,
  },
  {
    name: "Customer Password Reset CLI",
    description:
      "Adds a Magento CLI command to generate customer password reset tokens and trigger reset emails quickly.",
    repoUrl: "https://github.com/arjundhi/magento2-customer-password-reset-cli",
    stars: 0,
  },
  {
    name: "Payment Method Surcharge",
    description:
      "Adds configurable surcharge fees by payment method across checkout, totals, invoices, PDFs, and emails.",
    repoUrl: "https://github.com/arjundhi/magento2-payment-method-surcharge",
    stars: 0,
  },
  {
    name: "Catalog Grid Category Tools",
    description:
      "Adds a category filter and category column to Magento admin product listings for faster catalog management.",
    repoUrl: "https://github.com/arjundhi/magento2-catalog-grid-category-tools",
    stars: 0,
  },
  {
    name: "Sales Email Attachments",
    description:
      "Automatically attaches PDFs and policy files to Magento sales transactional emails without template overrides.",
    repoUrl: "https://github.com/arjundhi/magento2-sales-email-attachments",
    stars: 0,
  },
];