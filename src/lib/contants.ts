const CATEGORIES = {
  income: [
    { value: "salary", label: "Salary" },
    { value: "professional_services", label: "Professional services" },
    { value: "other_incomes", label: "Other incomes" }
  ],
  expense: [
    { value: "groceries", label: "Groceries" },
    { value: "restaurants", label: "Restaurants" },
    { value: "rent_and_utilities", label: "Rent and utilitie" },
    { value: "healthcare", label: "Healthcare" },
    { value: "sports", label: "Sports" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "pets", label: "Pets" },
    { value: "travel_and_transportation", label: "Travel and transportation" },
    { value: "investments", label: "Investments" },
    { value: "home", label: "Home" },
    { value: "other_expenses", label: "Other expense" }
  ]
};

const MAXIMUM_NEGATIVE_BALANCE = -100;
const MAXIMUM_BALANCE = 100000000;

const MINIMUM_TRANSACTION = 0;
const MAXIMUM_TRANSACTION_ABSOLUTE = 5000;

export {
  CATEGORIES,
  MAXIMUM_NEGATIVE_BALANCE,
  MAXIMUM_BALANCE,
  MINIMUM_TRANSACTION,
  MAXIMUM_TRANSACTION_ABSOLUTE
};
