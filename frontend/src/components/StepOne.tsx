import { useState } from "react";

import { ModelFormData }
    from "../types/model";

interface Props {

    formData: ModelFormData;

    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => void;

    nextStep: () => void;
}

export default function StepOne({

    formData,

    handleChange,

    nextStep,
}: Props) {

    const [showErrors, setShowErrors] =
        useState(false);

    // EMAIL VALIDATION

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid =
        emailRegex.test(
            formData.ownerEmail
        );

    // FORM VALIDATION

    const isValid =

        formData.modelName.trim() &&
        formData.teamName.trim() &&
        isEmailValid &&
        formData.description.trim();

    const handleNext = () => {

        if (!isValid) {

            setShowErrors(true);

            return;
        }

        nextStep();
    };

    return (

        <div className="space-y-8">

            {/* HEADER */}

            <div>

                <h2 className="text-3xl font-bold">

                    Model Details

                </h2>

                <p className="text-gray-500 mt-2">

                    Configure metadata and ownership
                    details for your ML deployment.

                </p>

            </div>

            {/* MODEL NAME */}

            <div>

                <label
                    className="
                    block
                    mb-2
                    font-semibold
                    text-gray-700
                "
                >

                    Model Name

                    <span className="text-red-500 ml-1">
                        *
                    </span>

                </label>

                <input
                    type="text"

                    name="modelName"

                    value={formData.modelName}

                    onChange={handleChange}

                    placeholder="customer-churn-predictor"

                    className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black
                    transition
                "
                />

                {showErrors &&
                    !formData.modelName && (

                        <p className="text-red-500 text-sm mt-2">

                            Model name is required

                        </p>
                    )}

            </div>

            {/* TEAM NAME */}

            <div>

                <label
                    className="
                    block
                    mb-2
                    font-semibold
                    text-gray-700
                "
                >

                    Team Name

                    <span className="text-red-500 ml-1">
                        *
                    </span>

                </label>

                <input
                    type="text"

                    name="teamName"

                    value={formData.teamName}

                    onChange={handleChange}

                    placeholder="platform-engineering"

                    className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black
                    transition
                "
                />

                {showErrors &&
                    !formData.teamName && (

                        <p className="text-red-500 text-sm mt-2">

                            Team name is required

                        </p>
                    )}

            </div>

            {/* OWNER EMAIL */}

            <div>

                <label
                    className="
                    block
                    mb-2
                    font-semibold
                    text-gray-700
                "
                >

                    Owner Email

                    <span className="text-red-500 ml-1">
                        *
                    </span>

                </label>

                <input
                    type="email"

                    name="ownerEmail"

                    value={formData.ownerEmail}

                    onChange={handleChange}

                    placeholder="team@company.com"

                    className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black
                    transition
                "
                />

                {showErrors &&
                    !isEmailValid && (

                        <p className="text-red-500 text-sm mt-2">

                            Please enter a valid email address

                        </p>
                    )}

            </div>

            {/* DESCRIPTION */}

            <div>

                <label
                    className="
                    block
                    mb-2
                    font-semibold
                    text-gray-700
                "
                >

                    Description

                    <span className="text-red-500 ml-1">
                        *
                    </span>

                </label>

                <textarea
                    name="description"

                    value={formData.description}

                    onChange={handleChange}

                    rows={5}

                    placeholder="Describe model deployment purpose..."

                    className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black
                    transition
                    resize-none
                "
                />

                {showErrors &&
                    !formData.description && (

                        <p className="text-red-500 text-sm mt-2">

                            Description is required

                        </p>
                    )}

            </div>

            {/* ACTION BUTTON */}

            <div className="pt-4">

                <button
                    onClick={handleNext}

                    className="
                    bg-black
                    hover:bg-gray-800
                    transition
                    text-white
                    px-8
                    py-4
                    rounded-xl
                    font-semibold
                    shadow-lg
                "
                >
                    Continue
                </button>

            </div>

        </div>
    );
}