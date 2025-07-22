import { useState } from "react";
import "./App.css";
import { testCases, type TestCase } from "./constants";

interface CustomPackageTest {
  width: number;
  height: number;
  length: number;
  mass: number;
}

export default function App() {
  const [results, setResults] = useState<{ [key: string]: string }>({});
  const [customPackageTest, setCustomPackageTest] = useState<CustomPackageTest>(
    {
      width: 0,
      height: 0,
      length: 0,
      mass: 0,
    }
  );
  const sortingResults = (
    width: number,
    height: number,
    length: number,
    mass: number
  ): string => {
    const isInvalid = [width, height, length, mass].some(
      (v) => typeof v !== "number" || !isFinite(v) || v < 0
    );
    if (isInvalid) {
      throw new Error(
        "Invalid input: all inputs must be finite non-negative numbers"
      );
    }
    const volume = width * height * length;
    const isBulky =
      volume >= 1000000 || width >= 150 || height >= 150 || length >= 150;
    const isHeavy = mass >= 20;
    console.log({ width, height, length, mass, isBulky, isHeavy, volume });
    return isBulky && isHeavy
      ? "REJECTED"
      : isBulky || isHeavy
      ? "SPECIAL"
      : "STANDARD";
  };
  const handleTestCase = (testCase: TestCase, index: number) => {
    console.log(`Testing ${testCase.description}`);
    const result = sortingResults(
      testCase.width,
      testCase.height,
      testCase.length,
      testCase.mass
    );
    setResults((prev) => ({ ...prev, [`test-${index}`]: result }));
  };

  const handleCustomTest = () => {
    const { width, height, length, mass } = customPackageTest;

    if (
      isNaN(width) ||
      isNaN(height) ||
      isNaN(length) ||
      isNaN(mass) ||
      width <= 0 ||
      height <= 0 ||
      length <= 0 ||
      mass <= 0
    ) {
      alert("Please enter valid positive numbers for all dimensions and mass");
      return;
    }

    const result = sortingResults(width, height, length, mass);
    setResults((prev) => ({ ...prev, custom: result }));
  };

  const updateCustomPackage = (
    field: keyof CustomPackageTest,
    value: string
  ) => {
    setCustomPackageTest((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const getResultClass = (result: string) => {
    switch (result) {
      case "STANDARD":
        return "result-standard";
      case "SPECIAL":
        return "result-special";
      case "REJECTED":
        return "result-rejected";
      default:
        return "";
    }
  };

  return (
    <main className="app">
      <div className="container">
        <h1>🤖 Robotic Arm Package Sorter</h1>

        <div className="rules">
          <h3>Sorting Rules:</h3>
          <ul>
            <li>
              <strong>Bulky:</strong> Volume ≥ 1,000,000 cm³ OR any dimension ≥
              150 cm
            </li>
            <li>
              <strong>Heavy:</strong> Mass ≥ 20 kg
            </li>
            <li>
              <strong>STANDARD:</strong> Not bulky and not heavy
            </li>
            <li>
              <strong>SPECIAL:</strong> Bulky OR heavy
            </li>
            <li>
              <strong>REJECTED:</strong> Bulky AND heavy
            </li>
          </ul>
        </div>
        <div className="custom-test">
          <h3>Custom Test Case</h3>
          <div className="inputs">
            <div className="input-group">
              <label>Width (cm):</label>
              <input
                type="number"
                value={customPackageTest.width || ""}
                onChange={(e) => updateCustomPackage("width", e.target.value)}
                placeholder="Enter width"
              />
            </div>
            <div className="input-group">
              <label>Height (cm):</label>
              <input
                type="number"
                value={customPackageTest.height || ""}
                onChange={(e) => updateCustomPackage("height", e.target.value)}
                placeholder="Enter height"
              />
            </div>
            <div className="input-group">
              <label>Length (cm):</label>
              <input
                type="number"
                value={customPackageTest.length || ""}
                onChange={(e) => updateCustomPackage("length", e.target.value)}
                placeholder="Enter length"
              />
            </div>
            <div className="input-group">
              <label>Mass (kg):</label>
              <input
                type="number"
                value={customPackageTest.mass || ""}
                onChange={(e) => updateCustomPackage("mass", e.target.value)}
                placeholder="Enter mass"
              />
            </div>
          </div>
          <button className="custom-test-btn" onClick={handleCustomTest}>
            Test Custom Package
          </button>
          {results.custom && (
            <div className="custom-result">
              Result:{" "}
              <span className={`result ${getResultClass(results.custom)}`}>
                {results.custom}
              </span>
            </div>
          )}
        </div>
        <div className="test-cases">
          <h3>Default Test Cases</h3>
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div className="test-info">
                <span className="description">{testCase.description}</span>
                <span className="dimensions">
                  W: {testCase.width}cm, H: {testCase.height}cm, L:{" "}
                  {testCase.length}cm, M: {testCase.mass}kg
                </span>
                <span className="volume">
                  Volume:{" "}
                  {(
                    testCase.width *
                    testCase.height *
                    testCase.length
                  ).toLocaleString()}{" "}
                  cm³
                </span>
              </div>
              <button
                className="test-btn"
                onClick={() => handleTestCase(testCase, index)}
              >
                Test Package
              </button>
              {results[`test-${index}`] && (
                <span
                  className={`result ${getResultClass(
                    results[`test-${index}`]
                  )}`}
                >
                  → {results[`test-${index}`]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
