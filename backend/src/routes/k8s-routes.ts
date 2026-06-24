import express from "express";
import { k8sApi, k8sAppsApi } from "../config/k8s";

const router = express.Router();

router.get("/pods", async (_req, res) => {
  try {
    const { body } = await k8sApi.listPodForAllNamespaces();
    const pods = body.items.map((pod) => ({
      name: pod.metadata?.name,
      namespace: pod.metadata?.namespace,
      status: pod.status?.phase,
      restarts: pod.status?.containerStatuses?.[0]?.restartCount ?? 0,
    }));
    res.json({ success: true, pods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch pods" });
  }
});

router.get("/namespaces", async (_req, res) => {
  try {
    const { body } = await k8sApi.listNamespace();
    res.json({ success: true, namespaces: body.items.map((ns) => ns.metadata?.name) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch namespaces" });
  }
});

router.get("/deployments", async (_req, res) => {
  try {
    const { body } = await k8sAppsApi.listDeploymentForAllNamespaces();
    const deployments = body.items.map((d) => ({
      name: d.metadata?.name,
      namespace: d.metadata?.namespace,
      replicas: d.spec?.replicas,
      available: d.status?.availableReplicas ?? 0,
    }));
    res.json({ success: true, deployments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch deployments" });
  }
});

export default router;