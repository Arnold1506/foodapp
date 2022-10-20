import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummarry from "./MealsSummarry";

const Meals=props=>{
    return(
        <Fragment>
            <MealsSummarry />
            <AvailableMeals />
        </Fragment>
    )
}

export default Meals;