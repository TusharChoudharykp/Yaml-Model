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

export default function StepTwo({

    formData,

    handleChange,

    nextStep,

    prevStep,
}: Props) {

    const isValid =

        formData.endpoint.trim() &&
        formData.namespace.trim() &&
        formData.port > 0 &&
        formData.variant.trim() &&
        formData.weight > 0;

    return (

        <div className="space-y-8">

            {/* HEADER */}

            <div>

                <h2 className="text-3xl font-bold">

                    Serving Configuration

                </h2>

                <p className="text-gray-500 mt-2">

                    Configure model serving endpoints,
                    namespaces and traffic routing.

                </p>

            </div>

            {/* ENDPOINT */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Endpoint URL
                </label>

                <input
                    type="text"

                    name="endpoint"

                    value={formData.endpoint}

                    onChange={handleChange}

                    placeholder="http://model-v1.ml.svc.cluster.local"

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

                {!formData.endpoint && (

                    <p className="text-red-500 text-sm mt-2">

                        Endpoint URL is required

                    </p>
                )}

            </div>

            {/* NAMESPACE */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Namespace
                </label>

                <input
                    type="text"

                    name="namespace"

                    value={formData.namespace}

                    onChange={handleChange}

                    placeholder="customer-analytics"

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

                {!formData.namespace && (

                    <p className="text-red-500 text-sm mt-2">

                        Namespace is required

                    </p>
                )}

            </div>

            {/* PORT */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Port
                </label>

                <input
                    type="number"

                    name="port"

                    value={formData.port}

                    onChange={handleChange}

                    placeholder="8080"

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

                {formData.port <= 0 && (

                    <p className="text-red-500 text-sm mt-2">

                        Port must be greater than 0

                    </p>
                )}

            </div>

            {/* VARIANT */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Variant
                </label>

                <input
                    type="text"

                    name="variant"

                    value={formData.variant}

                    onChange={handleChange}

                    placeholder="v1"

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

                {!formData.variant && (

                    <p className="text-red-500 text-sm mt-2">

                        Variant is required

                    </p>
                )}

            </div>

            {/* TRAFFIC WEIGHT */}

            <div>

                <label
                    className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
                >
                    Traffic Weight
                </label>

                <input
                    type="number"

                    name="weight"

                    value={formData.weight}

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

                {formData.weight <= 0 && (

                    <p className="text-red-500 text-sm mt-2">

                        Weight must be greater than 0

                    </p>
                )}

            </div>

            {/* INFO CARD */}

            <div
                className="
        bg-blue-50
        border
        border-blue-200
        rounded-2xl
        p-5
      "
            >

                <h3
                    className="
          font-semibold
          text-lg
          mb-2
        "
                >
                    Routing Preview
                </h3>

                <p className="text-sm text-gray-600 leading-6">

                    Incoming traffic will route to:

                </p>

                <div
                    className="
          mt-3
          bg-white
          rounded-xl
          p-4
          border
        "
                >

                    <p className="font-mono text-sm break-all">

                        {formData.endpoint}
                        :
                        {formData.port}

                    </p>

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