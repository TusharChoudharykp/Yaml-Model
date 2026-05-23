import { Copy, Check }
    from "lucide-react";

import { useState }
    from "react";

import { toast }
    from "sonner";

interface Props {
    yaml: string;
}

export default function PreviewPanel({
    yaml,
}: Props) {

    const [copied, setCopied] =
        useState(false);

    const copyYaml = async () => {

        try {

            await navigator.clipboard
                .writeText(yaml);

            setCopied(true);

            toast.success(
                "YAML copied successfully"
            );

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        } catch {

            toast.error(
                "Failed to copy YAML"
            );
        }
    };

    return (

        <div
            className="
      bg-black
      rounded-2xl
      overflow-hidden
      shadow-2xl
      h-full
      flex
      flex-col
    "
        >

            {/* HEADER */}

            <div
                className="
        bg-gray-900
        px-5
        py-4
        border-b
        border-gray-700
        flex
        justify-between
        items-center
      "
            >

                <div>

                    <p className="text-gray-300 text-sm">

                        deployment-config.yaml

                    </p>

                    <p className="text-gray-500 text-xs mt-1">

                        Generated Kubernetes deployment configuration

                    </p>

                </div>

                {/* COPY BUTTON */}

                <button
                    onClick={copyYaml}

                    className="
          flex
          items-center
          gap-2
          bg-gray-800
          hover:bg-gray-700
          transition
          px-4
          py-2
          rounded-xl
          text-sm
          text-white
        "
                >

                    {copied ? (

                        <>
                            <Check size={16} />
                            Copied
                        </>

                    ) : (

                        <>
                            <Copy size={16} />
                            {/* Copy YAML */}
                        </>
                    )}

                </button>

            </div>

            {/* YAML CONTENT */}

            <div
                className="
        flex-1
        overflow-auto
      "
            >

                <pre
                    className="
          text-green-400
          p-6
          text-sm
          leading-7
          whitespace-pre-wrap
        "
                >
                    {yaml}
                </pre>

            </div>

        </div>
    );
}