import PropTypes from "prop-types";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

export default function MenuItemForm({
  onSubmit,
  formData,
  handleChange,
  disabledSubmit,
  selectCategories,
  selectIngredients,
}) {
  return (
    <form onSubmit={onSubmit}>
      <p className="optional">* (opcionalno)</p>
      <FormInput
        name="imageLink"
        label="* Slika"
        placeholder="https://link-na-sliku.mym"
        value={formData.imageLink}
        onChange={handleChange}
      />
      <FormInput
        name="name"
        label="Naziv"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <FormSelect
        name="categories"
        label="Kategorije"
        value={formData.categories}
        onChange={handleChange}
        options={selectCategories}
        required
      />
      <FormSelect
        name="ingredients"
        label="Sastojci"
        value={formData.ingredients}
        onChange={handleChange}
        options={selectIngredients}
        required
      />
      <FormInput
        name="price"
        label="Cijena (€)"
        type="number"
        value={formData.price}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        required
      />
      <button disabled={disabledSubmit}>Potvrdi</button>
    </form>
  );
}

MenuItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabledSubmit: PropTypes.bool.isRequired,
  selectCategories: PropTypes.array.isRequired,
  selectIngredients: PropTypes.array.isRequired,
};
