import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating, handleRatingChange }) => {
    return [1, 2, 3, 4, 5].map((star) => (
        <Button
            key={star}
            variant="outline"
            className={`border-none p-[2px] hover:bg-white focus:outline-none rounded-full transition-colors
                    ${star <= rating
                    ? "text-yellow-500  hover:text-yellow-600"
                    : "text-black/50 hover:text-primary"
                }
        `}
            onClick={
                handleRatingChange ? () => handleRatingChange(star) : null
            }
        >
            <StarIcon
                className={`${star <= rating ? "fill-yellow-500" : "fill-primary-foreground"
                    } w-6 h-6 `}
            />
        </Button>
    ));
};

export default StarRating;
