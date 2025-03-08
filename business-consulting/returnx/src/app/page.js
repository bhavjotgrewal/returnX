'use client';

import { useState, useEffect } from "react";
import { ReturnStats } from "@/components/ReturnStats";
import { ReturnsChart } from "@/components/ReturnsChart";
import { TopReturnedProducts } from "@/components/TopReturnedProducts";
import { GenerateActionsButton } from "@/components/GenerateActionsButton";
import { motion } from "framer-motion";
import { redirect } from 'next/navigation';

export default function DashboardPage() {

  redirect('/dashboard');

}