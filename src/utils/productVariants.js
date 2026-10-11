// Helpers for product variant pricing calculation

export function parseBasePrice(priceStr) {
  const match = String(priceStr).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function getVariants(product) {
  const base = parseBasePrice(product.price);
  const pName = product.name.toLowerCase();

  // Special cases: Saffron
  if (pName.includes('saffron')) {
    return [
      { label: '1g Pack', priceFormatted: '₹450', numericPrice: 450, badge: 'Standard' },
      { label: '2g Pack', priceFormatted: '₹880', numericPrice: 880, badge: 'Popular' },
      { label: '5g Royal', priceFormatted: '₹2,150', numericPrice: 2150, badge: 'Save ₹100' },
    ];
  }

  // Bottles / Syrups
  if (product.price.includes('/ bottle')) {
    return [
      { label: '1 Bottle', priceFormatted: `₹${base}`, numericPrice: base, badge: 'Standard' },
      { label: 'Pack of 2', priceFormatted: `₹${Math.round(base * 1.95)}`, numericPrice: Math.round(base * 1.95), badge: 'Save 5%' },
    ];
  }

  // Tins / Mango Pulp
  if (product.price.includes('/ tin')) {
    return [
      { label: '1 Tin (850g)', priceFormatted: `₹${base}`, numericPrice: base, badge: 'Standard' },
      { label: 'Pack of 2', priceFormatted: `₹${Math.round(base * 1.9)}`, numericPrice: Math.round(base * 1.9), badge: 'Save 5%' },
      { label: 'Case of 4', priceFormatted: `₹${Math.round(base * 3.7)}`, numericPrice: Math.round(base * 3.7), badge: 'Best Value' },
    ];
  }

  // Boxes (Rolls, etc.)
  if (product.price.includes('/ box')) {
    return [
      { label: '1 Box', priceFormatted: `₹${base}`, numericPrice: base, badge: 'Standard' },
      { label: 'Pack of 2', priceFormatted: `₹${Math.round(base * 1.95)}`, numericPrice: Math.round(base * 1.95), badge: 'Save 5%' },
    ];
  }

  // Standard Dry Fruits & Nuts & Seeds sold per kg
  const p250 = Math.round(base * 0.27); // Slight premium for small pack
  const p500 = Math.round(base * 0.52);
  const p1kg = base;

  return [
    { label: '250g', priceFormatted: `₹${p250}`, numericPrice: p250, badge: 'Daily' },
    { label: '500g', priceFormatted: `₹${p500}`, numericPrice: p500, badge: 'Popular' },
    { label: '1kg', priceFormatted: `₹${p1kg}`, numericPrice: p1kg, badge: 'Best Value' },
  ];
}
