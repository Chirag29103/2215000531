import React, { useState } from "react";
import Card from "./card";
import Input from "./input";
import Button from "./button";
import Display from "./display"

const WINDOW_SIZE = 10;
const BASE_URL = "http://20.244.56.144/evaluation-service/";

export default function Calc() {
    const [numberId, setNumberId] = useState("");
    const [windowPrevState, setWindowPrevState] = useState([]);
    const [windowCurrState, setWindowCurrState] = useState([]);
    const [average, setAverage] = useState(null);
    const [error, setError] = useState(null);

    const fetchNumbers = async (id) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 500);



        try {
            if (id === 'p') id = 'primes';
            if (id === 'f') id = 'fibo';
            if (id === 'e') id = 'even';
            if (id === 'r') id = 'rand';
            const response = await fetch(`${BASE_URL}/${id}`, { signal: controller.signal });
            clearTimeout(timeout);
            const data = await response.json();
            return data.numbers || [];
        } catch (err) {
            clearTimeout(timeout);
            return [];
        }
    };

    const updateWindow = (newNumbers) => {
        const uniqueNewNumbers = newNumbers.filter(
            (num) => !windowCurrState.includes(num)
        );

        const updated = [...windowCurrState, ...uniqueNewNumbers];
        const trimmed = updated.slice(-WINDOW_SIZE);
        setWindowPrevState(windowCurrState);
        setWindowCurrState(trimmed);
        setAverage(
            trimmed.reduce((acc, curr) => acc + curr, 0) / trimmed.length
        );
    };

    const handleSubmit = async () => {
        if (!numberId.match(/^[pfer]$/)) {
            setError("Invalid number ID. Use 'p', 'f', 'e', or 'r'.");
            return;
        }
        setError(null);
        const newNums = await fetchNumbers(numberId);
        updateWindow(newNums);
    };

    return (
        <div className="p-6 min-w-screen mx-auto space-y-4 bg-gradient-to-br from-blue-400 to-red-500 min-h-screen">
            <Card>
                <h2 className="text-xl font-semibold text-center">Average Calculator</h2>
                <Input value={numberId} onChange={setNumberId} />
                <Button onClick={handleSubmit} />
                {error && <p className="text-red-500">{error}</p>}
                {average !== null && (
                    <Display
                        average={average}
                    />
                )}
            </Card>
        </div>
    );
}
