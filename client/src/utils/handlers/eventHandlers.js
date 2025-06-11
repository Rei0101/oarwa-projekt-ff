function handleFocus(getter, setError) {
  return function (e) {
    const { name } = e.target;
    setError(getter[name]);
  };
}

function handleBlur(setter) {
  return function (e) {
    const { name, value } = e.target;
    let valueCopy;

    if (name === "email") {
      valueCopy = value;

      setter((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setTimeout(() => {
      setter((prev) => ({
        ...prev,
        [name]: name === "email" ? valueCopy : value.trim(),
      }));
    }, 0);
  };
}

export { handleFocus, handleBlur };
