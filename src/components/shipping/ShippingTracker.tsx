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
  const { shipments, isLoading, updateStatus, createShipment, isUpdating, isCreating } = useShipments();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newShipment, setNewShipment] = useState({
    tracking_number: "",
    part_name: "",
    part_description: "",
    carrier: "",
    customer_name: "",
    customer_email: "",
    estimated_delivery_date: "",
  });

  const handleCreateShipment = () => {
    createShipment({
      ...newShipment,
      status: "pending",
      estimated_delivery_date: newShipment.estimated_delivery_date || null,
    });
    setIsDialogOpen(false);
    setNewShipment({
      tracking_number: "",
      part_name: "",
      part_description: "",
      carrier: "",
      customer_name: "",
      customer_email: "",
      estimated_delivery_date: "",
    });
  };

  const getStatusProgress = (status: string) => {
    const statuses = ["pending", "shipped", "in_transit", "out_for_delivery", "delivered"];
    const currentIndex = statuses.indexOf(status);
    return ((currentIndex + 1) / statuses.length) * 100;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary font-heading">Shipping Tracker</h2>
        <div className="text-center py-8">Loading shipments...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
        <h2 className="text-3xl font-bold text-primary dark:text-[#f97316] font-heading">Shipping Tracker</h2>
          <p className="text-muted-foreground mt-1">Track replacement parts shipments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Shipment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Shipment</DialogTitle>
              <DialogDescription>Add a new replacement part shipment to track</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking_number">Tracking Number</Label>
                  <Input
                    id="tracking_number"
                    value={newShipment.tracking_number}
                    onChange={(e) => setNewShipment({ ...newShipment, tracking_number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">Carrier</Label>
                  <Input
                    id="carrier"
                    placeholder="UPS, FedEx, USPS..."
                    value={newShipment.carrier}
                    onChange={(e) => setNewShipment({ ...newShipment, carrier: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="part_name">Part Name</Label>
                <Input
                  id="part_name"
                  value={newShipment.part_name}
                  onChange={(e) => setNewShipment({ ...newShipment, part_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="part_description">Part Description</Label>
                <Textarea
                  id="part_description"
                  value={newShipment.part_description}
                  onChange={(e) => setNewShipment({ ...newShipment, part_description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Customer Name</Label>
                  <Input
                    id="customer_name"
                    value={newShipment.customer_name}
                    onChange={(e) => setNewShipment({ ...newShipment, customer_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer_email">Customer Email</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={newShipment.customer_email}
                    onChange={(e) => setNewShipment({ ...newShipment, customer_email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated_delivery_date">Estimated Delivery Date</Label>
                <Input
                  id="estimated_delivery_date"
                  type="date"
                  value={newShipment.estimated_delivery_date}
                  onChange={(e) => setNewShipment({ ...newShipment, estimated_delivery_date: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleCreateShipment} disabled={isCreating || !newShipment.tracking_number || !newShipment.part_name}>
              Create Shipment
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {shipments.map((shipment) => {
          const config = statusConfig[shipment.status as keyof typeof statusConfig] || statusConfig.pending;
          const Icon = config.icon;
          
          return (
            <Card key={shipment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {shipment.part_name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Tracking: {shipment.tracking_number}
                    </CardDescription>
                  </div>
                  <Badge className={config.color}>
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${getStatusProgress(shipment.status)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Order Placed</span>
                    <span>Delivered</span>
                  </div>
                </div>

                <Table>
                  <TableBody>
                    {shipment.part_description && (
                      <TableRow>
                        <TableCell className="font-medium">Description</TableCell>
                        <TableCell>{shipment.part_description}</TableCell>
                      </TableRow>
                    )}
                    {shipment.carrier && (
                      <TableRow>
                        <TableCell className="font-medium">Carrier</TableCell>
                        <TableCell>{shipment.carrier}</TableCell>
                      </TableRow>
                    )}
                    {shipment.current_location && (
                      <TableRow>
                        <TableCell className="font-medium">Current Location</TableCell>
                        <TableCell>{shipment.current_location}</TableCell>
                      </TableRow>
                    )}
                    {shipment.customer_name && (
                      <TableRow>
                        <TableCell className="font-medium">Customer</TableCell>
                        <TableCell>{shipment.customer_name}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="font-medium">Order Date</TableCell>
                      <TableCell>{format(new Date(shipment.order_date), "MMM dd, yyyy")}</TableCell>
                    </TableRow>
                    {shipment.estimated_delivery_date && !shipment.actual_delivery_date && (
                      <TableRow>
                        <TableCell className="font-medium">Est. Delivery</TableCell>
                        <TableCell>{format(new Date(shipment.estimated_delivery_date), "MMM dd, yyyy")}</TableCell>
                      </TableRow>
                    )}
                    {shipment.actual_delivery_date && (
                      <TableRow>
                        <TableCell className="font-medium">Delivered</TableCell>
                        <TableCell>{format(new Date(shipment.actual_delivery_date), "MMM dd, yyyy")}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {shipment.status !== "delivered" && (
                  <div className="flex gap-2 pt-2">
                    <Select
                      disabled={isUpdating}
                      onValueChange={(value) => updateStatus({ id: shipment.id, status: value })}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {shipments.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No shipments yet. Create your first shipment to start tracking.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
