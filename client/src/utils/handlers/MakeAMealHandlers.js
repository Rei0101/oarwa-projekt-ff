function handleMealCreation(e, checkedIngredients) {
    e.preventDefault();

    let finalIngredients = []

    Object.entries(checkedIngredients).forEach(([key, value]) => {
        if (value === true) {
            finalIngredients.push(key)
        }
    });
    if(finalIngredients.length === 0){
        alert("Nema označenih sastojaka.")
        return;
    }

    console.log(finalIngredients);
    
}

export {handleMealCreation};