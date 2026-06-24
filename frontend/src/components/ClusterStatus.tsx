import { useEffect, useState } from "react";
import { RefreshCw, Box, Layers, Server } from "lucide-react";

interface Pod {
    name: string;
    namespace: string;
    status: string;
    restarts: number;
}

interface Deployment {
    name: string;
    namespace: string;
    replicas: number;
    available: number;
}

type TabKey = "pods" | "deployments" | "namespaces";

export default function ClusterStatus() {
    const [pods, setPods] = useState<Pod[]>([]);
    const [namespaces, setNamespaces] = useState<string[]>([]);
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabKey>("pods");
    const [selectedNamespace, setSelectedNamespace] = useState<string>("default");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [podsRes, nsRes, depRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/k8s/pods`, { credentials: "include" }),
                fetch(`${import.meta.env.VITE_API_URL}/k8s/namespaces`, { credentials: "include" }),
                fetch(`${import.meta.env.VITE_API_URL}/k8s/deployments`, { credentials: "include" }),
            ]);

            const podsData = await podsRes.json();
            const nsData = await nsRes.json();
            const depData = await depRes.json();

            if (podsData.success) setPods(podsData.pods);
            if (nsData.success) setNamespaces(nsData.namespaces);
            if (depData.success) setDeployments(depData.deployments);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getStatusColor = (status: string) => {
        if (status === "Running") {
            return "bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20";
        }
        if (status === "Pending") {
            return "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20";
        }
        return "bg-red-100 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
    };

    const filteredPods =
        selectedNamespace === "all"
            ? pods
            : pods.filter((pod) => pod.namespace === selectedNamespace);

    const tabs: { key: TabKey; label: string; icon: typeof Box }[] = [
        { key: "pods", label: `Pods (${pods.length})`, icon: Box },
        { key: "deployments", label: `Deployments (${deployments.length})`, icon: Layers },
        { key: "namespaces", label: `Namespaces (${namespaces.length})`, icon: Server },
    ];

    return (
        <div className="bg-white text-slate-700 rounded-2xl shadow-lg border border-slate-200 overflow-hidden w-full dark:bg-[#0b1324] dark:text-slate-100 dark:shadow-2xl dark:border-slate-800/60">
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800/60">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2.5 tracking-tight dark:text-white">
                        <Server size={20} className="text-violet-600 dark:text-violet-400" />
                        Kubernetes Cluster Status
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
                        Live data from your cluster
                    </p>
                </div>

                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 rounded-xl transition duration-200 disabled:opacity-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:border-slate-700/50 dark:hover:border-slate-600 dark:text-slate-200"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin text-violet-600 dark:text-violet-400" : ""} />
                    Refresh
                </button>
            </div>

            {/* TABS */}
            <div className="flex border-b border-slate-200 px-6 gap-2 dark:border-slate-800/60">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-3.5 font-medium text-sm border-b-2 transition duration-200 relative top-[1px] ${isActive
                                ? "border-violet-600 text-violet-600 font-semibold dark:border-violet-500 dark:text-violet-400"
                                : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                        >
                            <Icon size={16} className={isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-400"} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* CONTENT */}
            <div className="p-6 max-h-[26rem] overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <RefreshCw className="animate-spin text-violet-600 dark:text-violet-500" size={32} />
                        <span className="text-sm text-slate-500 font-medium dark:text-slate-400">Fetching cluster data...</span>
                    </div>
                ) : (
                    <>
                        {/* PODS TAB */}
                        {activeTab === "pods" && (
                            <table className="w-full text-sm border-collapse text-left">
                                <thead>
                                    <tr className="text-slate-500 border-b border-slate-200 dark:text-slate-400 dark:border-slate-800/60">
                                        <th className="pb-3 font-medium">Pod Name</th>
                                        <th className="pb-3 font-medium">Namespace</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Restarts</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                                    {pods.map((pod) => (
                                        <tr key={`${pod.namespace}-${pod.name}`} className="hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/20">
                                            <td className="py-3.5 font-medium text-slate-900 max-w-xs truncate dark:text-white">{pod.name}</td>
                                            <td className="py-3.5 text-slate-500 dark:text-slate-400">{pod.namespace}</td>
                                            <td className="py-3.5">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${getStatusColor(pod.status)}`}>
                                                    {pod.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 text-slate-600 font-mono text-xs dark:text-slate-300">{pod.restarts}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* DEPLOYMENTS TAB */}
                        {activeTab === "deployments" && (
                            <table className="w-full text-sm border-collapse text-left">
                                <thead>
                                    <tr className="text-slate-500 border-b border-slate-200 dark:text-slate-400 dark:border-slate-800/60">
                                        <th className="pb-3 font-medium">Deployment</th>
                                        <th className="pb-3 font-medium">Namespace</th>
                                        <th className="pb-3 font-medium">Replicas</th>
                                        <th className="pb-3 font-medium">Available</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                                    {deployments.map((dep) => (
                                        <tr key={`${dep.namespace}-${dep.name}`} className="hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/20">
                                            <td className="py-3.5 font-medium text-slate-900 dark:text-white">{dep.name}</td>
                                            <td className="py-3.5 text-slate-500 dark:text-slate-400">{dep.namespace}</td>
                                            <td className="py-3.5 text-slate-600 font-mono text-xs dark:text-slate-300">{dep.replicas}</td>
                                            <td className="py-3.5">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${dep.available === dep.replicas
                                                    ? "bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                                    : "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                                                    }`}>
                                                    {dep.available} / {dep.replicas}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* NAMESPACES TAB */}
                        {activeTab === "namespaces" && (
                            <div className="space-y-5">
                                <div className="max-w-xs">
                                    <label className="block text-xs uppercase font-semibold tracking-wider text-slate-500 mb-2 dark:text-slate-400">
                                        Select Namespace
                                    </label>
                                    <select
                                        value={selectedNamespace}
                                        onChange={(e) => setSelectedNamespace(e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition duration-150 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                    >
                                        <option value="all">All Namespaces</option>
                                        {namespaces.map((ns) => (
                                            <option key={ns} value={ns}>{ns}</option>
                                        ))}
                                    </select>
                                </div>

                                <table className="w-full text-sm border-collapse text-left">
                                    <thead>
                                        <tr className="text-slate-500 border-b border-slate-200 dark:text-slate-400 dark:border-slate-800/60">
                                            <th className="pb-3 font-medium">Pod Name</th>
                                            <th className="pb-3 font-medium">Namespace</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Restarts</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                                        {filteredPods.length > 0 ? (
                                            filteredPods.map((pod) => (
                                                <tr key={`${pod.namespace}-${pod.name}`} className="hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/20">
                                                    <td className="py-3.5 font-medium text-slate-900 max-w-xs truncate dark:text-white">{pod.name}</td>
                                                    <td className="py-3.5 text-slate-500 dark:text-slate-400">{pod.namespace}</td>
                                                    <td className="py-3.5">
                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${getStatusColor(pod.status)}`}>
                                                            {pod.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 text-slate-600 font-mono text-xs dark:text-slate-300">{pod.restarts}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-10 text-center text-slate-400 italic dark:text-slate-500">
                                                    No active pods found in this namespace
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}