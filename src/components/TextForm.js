import React, { useState } from "react";
import "./TextForm.css"; // Import your custom CSS

export default function TextForm(props) {
    const [text, setText] = useState("");

    const handleCaseChange = (convertCaseFunction, alertMessage) => {
        let newText = convertCaseFunction(text);
        setText(newText);
        props.showAlert(alertMessage, "success");
    };

    const handleClear = () => {
        setText("");
        props.showAlert("Cleared", "success");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied", "success");
    };

    const handleRemoveSpaces = () => {
        let newText = text.split(/\s+/).filter((element) => element.length !== 0).join(" ");
        setText(newText);
        props.showAlert("Removed Extra Spaces", "success");
    };

    const convertToUpperCase = (inputText) => inputText.toUpperCase();
    const convertToLowerCase = (inputText) => inputText.toLowerCase();
    const convertToCamelCase = (inputText) => {
        return inputText
            .split(/\s+/)
            .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
            .join("");
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className={`container text-form-container ${props.mode === "dark" ? "text-white" : "text-dark"}`}>
            <h1 className="mb-1">{props.heading}</h1>
            <div className="mb-1">
                <textarea
                    className={`form-control ${props.mode === "dark" ? "dark-textarea" : "light-textarea"}`}
                    value={text}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="button-container">
                <button disabled={text.length === 0} className={`btn ${props.mode === "dark" ? "btn-primary" : "btn-danger"} my-2 mx-2`} onClick={() => handleCaseChange(convertToUpperCase, "Converted To Upper Case")} >To Upper Case </button>
                <button disabled={text.length === 0} className={`btn ${props.mode === "dark" ? "btn-info" : "btn-warning"} my-2 mx-2`} onClick={() => handleCaseChange(convertToLowerCase, "Converted To Lower Case")} >To Lower Case</button>
                <button disabled={text.length === 0} className={`btn ${props.mode === "dark" ? "btn-success" : "btn-info"} my-2 mx-2`} onClick={handleClear}>Clear Text</button>
                <button disabled={text.length === 0} className={`btn ${props.mode === "dark" ? "btn-danger" : "btn-dark"} my-2 mx-2`} onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className={`btn ${props.mode === "dark" ? "btn-warning" : "btn-success"} mx-2 mx-2`} onClick={handleRemoveSpaces}>Remove Spaces</button>
                <button disabled={text.length === 0} className={`btn ${props.mode === "dark" ? "btn-success" : "btn-primary"} mx-2 mx-2`} onClick={() => handleCaseChange(convertToCamelCase, "Converted To Camel Case")}>To Camel Case</button>
            </div>
            <div className="container my-1">
                <h3>Your Text Summary</h3>
                <p>
                    {text.split(/\s+/).filter((element) => element.length !== 0).length} Words, {text.length} Characters
                </p>
                <p>{0.008 * text.split(" ").filter((element) => element.length !== 0).length} Words in a Minute</p>
                <h4>Preview</h4>
                <p>{text.length > 0 ? text : "Nothing to Preview"}</p>
            </div>
        </div>
    );
}
