export const camelize = (s: string) => {
    const words = s.split('-');
    const titleCaseWords = words.map(word => {
        // Capitalize the first letter of each word
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back together with spaces
    return titleCaseWords.join(' ');
};
