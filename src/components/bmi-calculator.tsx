"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";
//  import image
import Image from 'next/image'
import bgImage from '../../public/bg1.jpg'; // Import the image at the top

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the BMI result
interface BmiResult {
  bmi: string;
  category: string;
}

// Default export of the BmiCalculator function
export default function BmiCalculator() {
  // State hooks for managing height, weight, BMI result, and error message
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  // Handler for updating height state on input change
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  // Handler for updating weight state on input change
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  // Function to calculate the BMI and determine the category
  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight."); // Alert if either input is empty
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number."); // Alert if height is not positive
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number."); // Alert if weight is not positive
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters); // Calculate the BMI value
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight"; // Set category based on BMI value
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category }); // Set the BMI result state
    setError(""); // Clear any previous error message
  };

  // JSX return statement rendering the BMI calculator UI
  return (
    <div className=" relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
       <Image
  src={bgImage}
  layout="fill"
  objectFit="cover"
  alt="Background Image"
/>
      {/* Center the BMI calculator card within the screen */}
      <Card className="relative w-full max-w-md mx-auto bg-transparent border-blue-800 shadow-2xl rounded-lg">
        <CardHeader>
          {/* Header with title and description */}
          <CardTitle className="bg-gradient-to-br from-green-600 via-red-400 to-gray-700">BMI Calculator</CardTitle>
          <CardDescription>
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input for height */}
          <div className="grid gap-2">
            <Label htmlFor="height" className="text-yellow-300">Height (cm)</Label>
            <Input className="border border-transparent hover:border-white rounded-2xl bg-gradient-to-br from-green-600 via-yellow-400 to-gray-700  text-white "
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
            />
          </div>
          {/* Input for weight */}
          <div className="grid gap-2">
            <Label htmlFor="weight" className="text-yellow-300 " >Weight (kg)</Label>
            <Input className="border border-transparent hover:border-white rounded-2xl bg-gradient-to-br from-green-600 via-yellow-400 to-gray-700 text-white  "
              id="weight"
              type="number"
              placeholder="Enter your weight "
              value={weight}
              onChange={handleWeightChange}
            />
          </div>
          {/* Button to calculate BMI */}
          <Button onClick={calculateBmi} className="border border-transparent hover:border-white rounded-2xl  bg-gradient-to-br from-green-600 via-yellow-400 to-gray-700  text-white font-bold">Calculate</Button>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display BMI result if available */}
          {result && (
            <div className="grid gap-2">
              <div className="text-center text-2xl font-bold">{result.bmi}</div>
              <div className="text-center text-muted-foreground">
                {result.category}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}