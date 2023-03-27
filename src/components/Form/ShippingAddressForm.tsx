import React from "react";

const ShippingAddressForm = ({
    addressValues,
    validationError,
    loading,
    handleAddressValueChange,
    submitShippingAddressToDb,
}:any) => {
    const { fullName, address, country, city, postalCode } = addressValues;
   
    return (
        <form onSubmit={submitShippingAddressToDb}>
            <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-primary">Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={handleAddressValueChange}
                    className={`input input-bordered  w-full text-primary ${
                        validationError && validationError.fullName
                            ? "input-error"
                            : "input-success"
                    }`} 
                    id="fullName"
                    placeholder="Enter Your Full Name"
                />
                {validationError && validationError.fullName && (
                    <div className="text-red-500">
                        {validationError.fullName}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-primary">Address:</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAddressValueChange}
                    className={`input input-bordered w-full  text-primary ${
                        validationError && validationError.address
                        ? "input-error"
                        : "input-success"
                    }`}
                    id="address"
                    placeholder="Enter Your Address"
                />
                {validationError && validationError.address && (
                    <div className="text-red-500">
                        {validationError.address}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-primary">Country</label>
                <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={handleAddressValueChange}
                    className={`input input-bordered  w-full  text-primary ${
                        validationError && validationError.country
                        ? "input-error"
                        : "input-success"
                    }`}
                    id="country"
                    placeholder="Enter Your Country Name"
                />
                {validationError && validationError.country && (
                    <div className="text-red-500">
                        {validationError.country}
                    </div>
                ) }
            </div>
            <div className="form-group">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-primary">City</label>
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleAddressValueChange}
                    className={`input input-bordered  w-full text-primary ${
                        validationError && validationError.city
                        ? "input-error"
                        : "input-success"
                    }`}
                    id="city"
                    placeholder="Enter Your City Name"
                />
                {validationError && validationError.city && (
                    <div className="text-red-500">
                        {validationError.city}
                    </div>
                ) }
            </div>
            <div className="form-group">
                <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-primary">Postal Code:</label>
                <input
                    type="text"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleAddressValueChange}
                    className={`input input-bordered  w-full text-primary ${
                        validationError && validationError.postalCode
                        ? "input-error"
                        : "input-success"
                    }`}
                    id="postalCode"
                    placeholder="Enter Your Postal Code"
                />
                {validationError && validationError.postalCode && (
                    <div className="text-red-500">
                        {validationError.postalCode}
                    </div>
                ) }
            </div>
            <button type="submit" className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

export default ShippingAddressForm;
