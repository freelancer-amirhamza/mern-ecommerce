import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating, handleRatingChange }) => {
    return [1, 2, 3, 4, 5].map((star) => (
        <Button
            key={star}
            variant="outline"
            size="icon"
            className={` p-2 rounded-full transition-colors
                    ${star <= rating
                    ? "text-yellow-500 hover:bg-black "
                    : "text-black hover:bg-primary hover:text-primary-foreground"
                }
        `}
            onClick={
                handleRatingChange ? () => handleRatingChange(star) : null
            }
        >
            <StarIcon
                className={`${star <= rating ? "fill-yellow-500" : "fill-black"
                    } w-5 h-5 `}
            />
        </Button>
    ));
};

export default StarRating;
