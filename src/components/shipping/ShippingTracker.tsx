import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useShipments } from "@/hooks/useShipments";
import { Package, Truck, MapPin, CheckCircle, Clock, Plus } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-muted text-muted-foreground" },
  shipped: { label: "Shipped", icon: Package, color: "bg-blue-500 text-white" },
  in_transit: { label: "In Transit", icon: Truck, color: "bg-yellow-500 text-white" },
  out_for_delivery: { label: "Out for Delivery", icon: MapPin, color: "bg-orange-500 text-white" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-500 text-white" },
};

export const ShippingTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary font-heading">Shipping Tracker</h2>
          <p className="text-muted-foreground mt-1">Track replacement parts shipments</p>
        </div>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Shipping tracker is loading...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
