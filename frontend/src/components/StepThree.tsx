import { ModelFormData }
    from "../types/model";

interface Props {

    formData: ModelFormData;

    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => void;

    nextStep: () => void;

    prevStep: () => void;
}

export default function StepThree({

    formData,

    handleChange,

    nextStep,

    prevStep,
}: Props) {

    const isValid =

        formData.timeout > 0 &&
        formData.rps > 0;

    return (

        <div className="space-y-8">

            {/* HEADER */}

            <div>

                <h2 className="text-3xl font-bold">

                    Deployment Rules

                </h2>

                <p className="text-gray-500 mt-2">

                    Configure timeout policies,
                    traffic limits and deployment
                    behavior for your ML service.

                </p>

            </div>

            {/* TIMEOUT */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Timeout (seconds)
                </label>

                <input
                    type="number"

                    name="timeout"

                    value={formData.timeout}

                    onChange={handleChange}

                    placeholder="5"

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

                {formData.timeout <= 0 && (

                    <p className="text-red-500 text-sm mt-2">

                        Timeout must be greater than 0

                    </p>
                )}

            </div>

            {/* RPS */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Requests Per Second
                </label>

                <input
                    type="number"

                    name="rps"

                    value={formData.rps}

                    onChange={handleChange}

                    placeholder="100"

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

                {formData.rps <= 0 && (

                    <p className="text-red-500 text-sm mt-2">

                        RPS must be greater than 0

                    </p>
                )}

            </div>

            {/* DEPLOYMENT SUMMARY */}

            <div
                className="
        bg-blue-50
        border
        border-blue-200
        rounded-2xl
        p-6
      "
            >

                <h3
                    className="
          font-semibold
          text-xl
          mb-5
        "
                >
                    Deployment Summary
                </h3>

                <div className="space-y-4">

                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            Model Name
                        </span>

                        <span className="font-semibold">
                            {formData.modelName}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            Variant
                        </span>

                        <span className="font-semibold">
                            {formData.variant}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            Namespace
                        </span>

                        <span className="font-semibold">
                            {formData.namespace}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            Timeout
                        </span>

                        <span className="font-semibold">
                            {formData.timeout}s
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            RPS
                        </span>

                        <span className="font-semibold">
                            {formData.rps}
                        </span>

                    </div>

                </div>

            </div>

            {/* CONFIGURATION INFO */}

            <div
                className="
        bg-gray-50
        border
        rounded-2xl
        p-6
      "
            >

                <h3
                    className="
          font-semibold
          text-lg
          mb-4
        "
                >
                    Runtime Configuration
                </h3>

                <div className="space-y-3">

                    <div
                        className="
            flex
            justify-between
            items-center
          "
                    >

                        <span className="text-gray-600">
                            Traffic Weight
                        </span>

                        <span className="font-medium">
                            {formData.weight}%
                        </span>

                    </div>

                    <div
                        className="
            flex
            justify-between
            items-center
          "
                    >

                        <span className="text-gray-600">
                            Endpoint
                        </span>

                        <span
                            className="
              font-mono
              text-sm
              text-right
              break-all
            "
                        >
                            {formData.endpoint}
                        </span>

                    </div>

                </div>

            </div>

            {/* ACTION BUTTONS */}

            <div className="flex gap-4 pt-4">

                <button
                    onClick={prevStep}

                    className="
          bg-gray-200
          hover:bg-gray-300
          transition
          px-8
          py-4
          rounded-xl
          font-semibold
        "
                >
                    Back
                </button>

                <button
                    onClick={nextStep}

                    disabled={!isValid}

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
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
                >
                    Continue
                </button>

            </div>

        </div>
    );
}