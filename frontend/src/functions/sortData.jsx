export const sortByRoll = (contestData) => {
        contestData.sort((a, b) => {
        const prefixOrder = ["123cs", "523cs"];
        const prefixA = a.rollno.slice(0, 5);
        const prefixB = b.rollno.slice(0, 5);
    
        const prefixComparison = prefixOrder.indexOf(prefixA) - prefixOrder.indexOf(prefixB);
    
        if (prefixComparison !== 0) {
            return prefixComparison;
        }
    
        const rollA = parseInt(a.rollno.match(/\d+$/)[0]);
        const rollB = parseInt(b.rollno.match(/\d+$/)[0]);
        return rollA - rollB;
    });
}