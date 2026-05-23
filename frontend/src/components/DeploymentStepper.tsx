interface Props {
    step: number;
}

export default function DeploymentStepper({ step }: Props) {
    const steps = [
        "Model Details",
        "Serving Config",
        "Deployment Rules",
        "Preview",
    ];

    return (
        <div className="space-y-8 relative">
            {steps.map((item, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;

                return (
                    <div key={index} className="flex items-center gap-4 relative z-10">
                        <div
                            className={`
                                w-8 h-8 rounded-none flex items-center justify-center text-xs font-black transition-all duration-300 border-2
                                ${isActive
                                    ? "bg-rose-600 border-rose-600 text-white scale-110 shadow-lg shadow-rose-600/20"
                                    : isCompleted
                                        ? "bg-neutral-950 border-neutral-950 text-white"
                                        : "bg-white border-neutral-200 text-neutral-400"
                                }
                            `}
                        >
                            {stepNum}
                        </div>
                        <p
                            className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${isActive ? "text-neutral-950 font-black" : "text-neutral-400"
                                }`}
                        >
                            {item}
                        </p>
                    </div>
                );
            })}
            <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-neutral-200 -z-0" />
        </div>
    );
}