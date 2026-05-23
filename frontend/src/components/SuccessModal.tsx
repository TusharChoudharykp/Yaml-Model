interface Props {

    open: boolean;

    onClose: () => void;

    prUrl: string;

    branchName: string;

    repoName: string;
}

export default function SuccessModal({

    open,

    onClose,

    prUrl,

    branchName,

    repoName,
}: Props) {

    if (!open) return null;

    return (

        <div
            className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
        >

            <div
                className="
        bg-white
        rounded-2xl
        p-8
        w-full
        max-w-lg
        shadow-2xl
      "
            >

                <h2 className="text-3xl font-bold mb-4">
                    Pull Request Created
                </h2>

                <p className="text-gray-600 mb-6">
                    Your deployment configuration
                    has been submitted successfully.
                </p>

                <div className="space-y-4">

                    <div className="bg-gray-50 p-4 rounded-xl">

                        <p className="text-sm text-gray-500">
                            Repository
                        </p>

                        <p className="font-semibold">
                            {repoName}
                        </p>

                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">

                        <p className="text-sm text-gray-500">
                            Feature Branch
                        </p>

                        <p className="font-semibold">
                            {branchName}
                        </p>

                    </div>

                </div>

                <div className="flex gap-4 mt-8">

                    <a
                        href={prUrl}
                        target="_blank"
                        className="
            flex-1
            bg-black
            text-white
            text-center
            py-3
            rounded-xl
            font-semibold
          "
                    >
                        View Pull Request
                    </a>

                    <button
                        onClick={onClose}
                        className="
            flex-1
            bg-gray-200
            py-3
            rounded-xl
            font-semibold
          "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}