
import { useState } from "react";
import "./App.css";

function App() {

    // 1. State
    const [flavors, setFlavors] = useState([
        { name: "Vanilla", isSoldOut: false, scoopsSelected: 0 },
        { name: "Chocolate", isSoldOut: true, scoopsSelected: 0 },
        { name: "Strawberry", isSoldOut: false, scoopsSelected: 0 },
        { name: "Mango", isSoldOut: false, scoopsSelected: 0 },
        { name: "Pistachio", isSoldOut: false, scoopsSelected: 0 }
    ]);

    const [scoopLimit] = useState(5);

    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);


    // 2. Calculate total scoops and price
    const totalScope = flavors.reduce(
        (sum, flavor) => sum + flavor.scoopsSelected, 0
    );

    const price = totalScope * 5;


    // 3. Filter flavors
    const visibleFlavors = showOnlyAvailable
        ? flavors.filter(flavor => !flavor.isSoldOut)
        : flavors;


    // 4. Add scoop
    function addScope(name) {

        setFlavors(prevFlavors => {

            const total = prevFlavors.reduce(
                (sum, flavor) => sum + flavor.scoopsSelected, 0
            );

            if (total >= scoopLimit) {
                return prevFlavors;
            }

            return prevFlavors.map(flavor => {

                if (
                    flavor.name === name &&
                    !flavor.isSoldOut
                ) {
                    return {
                        ...flavor,
                        scoopsSelected: flavor.scoopsSelected + 1
                    };
                }

                return flavor;
            });
        });
    }


    // 5. Remove scoop
    function removeScoop(name) {

        setFlavors(prevFlavors =>
            prevFlavors.map(flavor => {

                if (
                    flavor.name === name &&
                    !flavor.isSoldOut &&
                    flavor.scoopsSelected > 0
                ) {
                    return {
                        ...flavor,
                        scoopsSelected: flavor.scoopsSelected - 1
                    };
                }

                return flavor;
            })
        );
    }


    // 6. Clear order - Bonus
    function clearOrder() {

        setFlavors(prevFlavors =>
            prevFlavors.map(flavor => ({
                ...flavor,
                scoopsSelected: 0
            }))
        );
    }


    // 7. JSX
    return (
        <div className="App">

            {/* Header */}
            <header>
                <h1>🍦 Ice-Cream Kiosk</h1>
                <p>Choose your favorite flavors</p>
            </header>


            {/* Filter */}
            <section className="filterBar">

                <label>
                    <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={e =>
                            setShowOnlyAvailable(e.target.checked)
                        }
                    />

                    Show only available
                </label>

                <span>
                    {totalScope} / {scoopLimit} Scoops
                </span>

            </section>


            {/* Notice Area */}
            <section className="noticeArea">

                {totalScope >= scoopLimit && (
                    <p className="warning">
                        Scoop limit reached
                    </p>
                )}

                {showOnlyAvailable && visibleFlavors.length === 0 && (
                    <p className="warning">
                        No flavors to show
                    </p>
                )}

            </section>


            {/* Flavor List */}
            <section className="flavorList">

                {visibleFlavors.map(flavor => (

                    <div
                        className={`flavorCard ${
                            flavor.isSoldOut ? "soldOut" : ""
                        }`}
                        key={flavor.name}
                    >

                        <h2>{flavor.name}</h2>

                        {flavor.isSoldOut && (
                            <span className="badge">
                                Sold Out
                            </span>
                        )}

                        <div className="controls">

                            <button
                                onClick={() => removeScoop(flavor.name)}
                                disabled={
                                    flavor.isSoldOut ||
                                    flavor.scoopsSelected === 0
                                }
                            >
                                -
                            </button>

                            <span>{flavor.scoopsSelected}</span>

                            <button
                                onClick={() => addScope(flavor.name)}
                                disabled={
                                    flavor.isSoldOut ||
                                    totalScope >= scoopLimit
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>

                ))}

            </section>


            {/* Order Summary */}
            <section className="orderSummary">

                <h2>Order Summary</h2>

                <p>Total Scoops: {totalScope}</p>

                <p>Total Price: ${price}</p>

                {totalScope === 0 && (
                    <p className="emptyOrder">
                        Your order is empty
                    </p>
                )}

                <button
                    className="clearButton"
                    onClick={clearOrder}
                    disabled={totalScope === 0}
                >
                    Clear Order
                </button>

            </section>

        </div>
    );
}

export default App;
