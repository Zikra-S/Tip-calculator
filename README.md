# Tip Calculator App

A responsive tip calculator built with **HTML, Tailwind CSS, and TypeScript**.

The app allows users to enter a bill amount, select or enter a custom tip percentage, and specify the number of people sharing the bill. It then calculates the **tip amount per person** and **total amount per person** in real time.

##  Features

*  Enter a bill amount
*  Select a preset tip percentage
*  Enter a custom tip percentage
*  Enter the number of people
*  Calculate tip and total amounts per person
*  Validate the number of people
*  Reset all inputs and results
*  Responsive design
*  Clean and accessible interface

##  Built With

* HTML5
* Tailwind CSS
* TypeScript
* Vite

## How It Works

The calculator uses the following formulas:

**Tip per person**

`(Bill × Tip Percentage) ÷ Number of People`

**Total per person**

`(Bill × (1 + Tip Percentage)) ÷ Number of People`

The displayed results are formatted to two decimal places.

