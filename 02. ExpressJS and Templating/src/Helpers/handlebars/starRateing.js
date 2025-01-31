export const starRating = function (rating) {
    const fullStar = "★";  // Unicode Full Star
    const emptyStar = "☆"; // Unicode Empty Star

    let fullStarsCount = Math.round(rating); // Round rating (4.4 → 4, 4.6 → 5)
    let emptyStarsCount = 5 - fullStarsCount; // Remaining stars

    return fullStar.repeat(fullStarsCount) + emptyStar.repeat(emptyStarsCount);
};
