import { useEffect, useState } from "react";

import YAML from "yaml";

import { toast } from "sonner";

import { Loader2 } from "lucide-react";

import { ModelFormData } from "../types/model";

import FormHeader from "./FormHeader";
import DeploymentStepper from "./DeploymentStepper";
import PreviewPanel from "./PreviewPanel";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

import SuccessModal from "./SuccessModal";

interface Props {
    user: {
        username: string;
        avatar: string;
        profileUrl: string;
    } | null;
}

const initialData: ModelFormData = {
    modelName: "",
    teamName: "",
    ownerEmail: "",
    description: "",

    endpoint: "",
    namespace: "",
    port: 8080,
    variant: "v1",
    weight: 100,

    timeout: 5,
    rps: 100,
};

export default function MultiStepForm({
    user,
}: Props) {

    const [step, setStep] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [prUrl, setPrUrl] =
        useState("");

    const [branchName, setBranchName] =
        useState("");

    const [formData, setFormData] =
        useState<ModelFormData>(
            initialData
        );

    useEffect(() => {

        if (formData.modelName) {

            setFormData((prev) => ({
                ...prev,

                namespace:
                    `${prev.modelName}-ml`,

                endpoint:
                    `http://${prev.modelName}-v1.ml.svc.cluster.local`,
            }));
        }

    }, [formData.modelName]);

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        const { name, value } =
            e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                e.target.type === "number"
                    ? Number(value)
                    : value,
        }));
    };

    const generatedYaml =
        YAML.stringify({

            metadata: {

                name:
                    formData.modelName,

                labels: {

                    team:
                        formData.teamName,

                    owner:
                        formData.ownerEmail,
                },

                annotations: {

                    notes:
                        formData.description,
                },
            },

            spec: {

                serving: {

                    variants: [
                        {

                            name:
                                formData.variant,

                            endpoint:
                                `${formData.endpoint}:${formData.port}`,

                            weight:
                                Number(
                                    formData.weight
                                ),
                        },
                    ],
                },

                timeout:
                    `${formData.timeout}s`,

                rate_limit: {

                    rps:
                        Number(
                            formData.rps
                        ),
                },
            },
        });

    const createPullRequest =
        async () => {

            try {

                setLoading(true);

                toast.loading(
                    "Creating pull request..."
                );

                const response =
                    await fetch(
                        `${import.meta.env.VITE_API_URL}/deploy`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            credentials: "include",

                            body: JSON.stringify({

                                yamlContent:
                                    generatedYaml,

                                modelName:
                                    formData.modelName,

                                owner:
                                    user?.username,
                            }),
                        }
                    );

                const data =
                    await response.json();

                toast.dismiss();

                if (data.success) {

                    toast.success(
                        "Pull request created successfully"
                    );

                    setPrUrl(
                        data.prUrl
                    );

                    setBranchName(
                        `feature/${formData.modelName}-config`
                    );

                    setModalOpen(true);

                } else {

                    toast.error(
                        data.message
                    );
                }

            } catch (error) {

                console.log(error);

                toast.dismiss();

                toast.error(
                    "Failed to create pull request"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="max-w-7xl mx-auto">

            <FormHeader />

            <div
                className="
        grid
        grid-cols-1
        lg:grid-cols-12
        bg-white
        rounded-b-2xl
        overflow-hidden
        shadow-2xl
        min-h-[700px]
      "
            >

                {/* LEFT SIDEBAR */}

                <div
                    className="
          lg:col-span-3
          bg-gray-50
          p-8
          border-r
        "
                >

                    <DeploymentStepper
                        step={step}
                    />

                </div>

                {/* FORM AREA */}

                <div
                    className="
          lg:col-span-5
          p-10
        "
                >

                    {/* STEP 1 */}

                    {step === 1 && (

                        <StepOne
                            formData={formData}
                            handleChange={
                                handleChange
                            }
                            nextStep={
                                nextStep
                            }
                        />
                    )}

                    {/* STEP 2 */}

                    {step === 2 && (

                        <StepTwo
                            formData={formData}
                            handleChange={
                                handleChange
                            }
                            nextStep={
                                nextStep
                            }
                            prevStep={
                                prevStep
                            }
                        />
                    )}

                    {/* STEP 3 */}

                    {step === 3 && (

                        <StepThree
                            formData={formData}
                            handleChange={
                                handleChange
                            }
                            nextStep={
                                nextStep
                            }
                            prevStep={
                                prevStep
                            }
                        />
                    )}

                    {/* STEP 4 */}

                    {step === 4 && (

                        <div className="space-y-6">

                            <div
                                className="
                bg-gradient-to-r
                from-green-50
                to-emerald-50
                border
                border-green-200
                rounded-2xl
                p-6
                shadow-sm
              "
                            >

                                <h3 className="font-bold text-2xl mb-3">

                                    Ready to Create Pull Request

                                </h3>

                                <p className="text-gray-600 leading-7">

                                    Your deployment
                                    configuration has been
                                    validated and is ready
                                    for GitOps workflow.

                                </p>

                            </div>

                            {/* SUMMARY */}

                            <div
                                className="
                bg-gray-50
                rounded-2xl
                p-6
                border
              "
                            >

                                <h4
                                    className="
                  font-semibold
                  text-lg
                  mb-4
                "
                                >
                                    Pull Request Summary
                                </h4>

                                <div className="space-y-3">

                                    <div className="flex justify-between">

                                        <span className="text-gray-600">
                                            Feature Branch
                                        </span>

                                        <span className="font-semibold">
                                            feature/
                                            {formData.modelName}
                                            -config
                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-gray-600">
                                            Base Branch
                                        </span>

                                        <span className="font-semibold">
                                            dev
                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-gray-600">
                                            Repository
                                        </span>

                                        <span className="font-semibold">
                                            ml-model-configs
                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-gray-600">
                                            Model
                                        </span>

                                        <span className="font-semibold">
                                            {
                                                formData.modelName
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ACTION BUTTONS */}

                            <div className="flex gap-4">

                                <button
                                    onClick={
                                        prevStep
                                    }

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
                                    onClick={
                                        createPullRequest
                                    }

                                    disabled={
                                        loading
                                    }

                                    className="
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-600
                  hover:from-green-700
                  hover:to-emerald-700
                  transition
                  duration-300
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

                                    {loading ? (

                                        <div className="flex items-center gap-2">

                                            <Loader2
                                                className="animate-spin"
                                                size={18}
                                            />

                                            Creating Pull Request...

                                        </div>

                                    ) : (

                                        "Create Pull Request"
                                    )}

                                </button>

                            </div>

                        </div>
                    )}

                </div>

                {/* YAML PREVIEW */}

                <div
                    className="
          lg:col-span-4
          bg-gray-950
          p-5
        "
                >

                    <PreviewPanel
                        yaml={generatedYaml}
                    />

                </div>

            </div>

            {/* SUCCESS MODAL */}

            <SuccessModal

                open={modalOpen}

                onClose={() =>
                    setModalOpen(false)
                }

                prUrl={prUrl}

                branchName={branchName}

                repoName="ml-model-configs"
            />

        </div>
    );
}