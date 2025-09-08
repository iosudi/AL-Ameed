// Car Body Types
export const getBodyTypes = (currentLanguage: string) => [
    {
        value: "sedan",
        label: currentLanguage === "ar" ? "سيدان" : "Sedan",
    },
    {
        value: "suv",
        label: currentLanguage === "ar" ? "دفع رباعي / SUV" : "SUV",
    },
    {
        value: "hatchback",
        label: currentLanguage === "ar" ? "هاتشباك" : "Hatchback",
    },
    {
        value: "crossover",
        label: currentLanguage === "ar" ? "كروس أوفر" : "Crossover",
    },
    {
        value: "pickup",
        label: currentLanguage === "ar" ? "بيك أب" : "Pickup Truck",
    },
    {
        value: "minivan",
        label: currentLanguage === "ar" ? "فان / عائلية" : "Minivan / MPV",
    },
    {
        value: "coupe",
        label: currentLanguage === "ar" ? "كوبيه" : "Coupe",
    },
    {
        value: "convertible",
        label: currentLanguage === "ar" ? "كابريوليه" : "Convertible",
    },
    {
        value: "wagon",
        label: currentLanguage === "ar" ? "ستيشن واجن" : "Station Wagon",
    },
    {
        value: "limousine",
        label: currentLanguage === "ar" ? "ليموزين" : "Limousine",
    },
    {
        value: "classic",
        label: currentLanguage === "ar" ? "كلاسيك / تريكلية" : "Classic & Trucks",
    },
];

// Car Colors
export const getColors = (currentLanguage: string) => [
    {
        value: "white",
        label: currentLanguage === "ar" ? "أبيض" : "White",
    },
    {
        value: "black",
        label: currentLanguage === "ar" ? "أسود" : "Black",
    },
    {
        value: "silver",
        label: currentLanguage === "ar" ? "فضي" : "Silver",
    },
    {
        value: "gray",
        label: currentLanguage === "ar" ? "رمادي" : "Gray",
    },
    {
        value: "red",
        label: currentLanguage === "ar" ? "أحمر" : "Red",
    },
    {
        value: "blue",
        label: currentLanguage === "ar" ? "أزرق" : "Blue",
    },
    {
        value: "green",
        label: currentLanguage === "ar" ? "أخضر" : "Green",
    },
    {
        value: "yellow",
        label: currentLanguage === "ar" ? "أصفر" : "Yellow",
    },
    {
        value: "orange",
        label: currentLanguage === "ar" ? "برتقالي" : "Orange",
    },
    {
        value: "brown",
        label: currentLanguage === "ar" ? "بني" : "Brown",
    },
    {
        value: "gold",
        label: currentLanguage === "ar" ? "ذهبي" : "Gold",
    },
    {
        value: "beige",
        label: currentLanguage === "ar" ? "بيج" : "Beige",
    },
    {
        value: "purple",
        label: currentLanguage === "ar" ? "بنفسجي" : "Purple",
    },
    {
        value: "pink",
        label: currentLanguage === "ar" ? "وردي" : "Pink",
    },
    {
        value: "maroon",
        label: currentLanguage === "ar" ? "كستنائي" : "Maroon",
    },
    {
        value: "navy",
        label: currentLanguage === "ar" ? "كحلي" : "Navy Blue",
    },
    {
        value: "bronze",
        label: currentLanguage === "ar" ? "برونزي" : "Bronze",
    },
    {
        value: "champagne",
        label: currentLanguage === "ar" ? "شامبان" : "Champagne",
    },
];