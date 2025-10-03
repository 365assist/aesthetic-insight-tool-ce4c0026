import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QrCode, HardHat, Package, CheckCircle } from "lucide-react";
import React, { useState } from "react";

const UDIProgram = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [udiCode, setUdiCode] = useState("UDI-DI-123456-PI-A1B2C3");
  const [regulatoryStatus, setRegulatoryStatus] = useState("Pending Submission");

  const handleGenerateUDI = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for UDI generation logic (actual USFDA formula)
    const mockUdi = `UDI-DI-${Math.floor(100000 + Math.random() * 900000)}-PI-X1Y2Z3`;
    setUdiCode(mockUdi);
    setRegulatoryStatus("Ready to Submit to USFDA");
  };

  const inventoryData = [
    { id: '1001', product: 'VADER Laser', count: 5, pending: 2, udi: 'UDI-DI-100001' },
    { id: '1002', product: 'Artisan Sculptor', count: 8, pending: 1, udi: 'UDI-DI-100002' },
    { id: '1003', product: 'Tri-Pulse Removal', count: 3, pending: 0, udi: 'UDI-DI-100003' },
  ];

  return (
    <div className="min-h-screen bg-muted/40">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-4xl font-bold mb-2">UDI Program & Inventory</h1>
        <p className="text-muted-foreground mb-8">Manage inventory, generate Unique Device Identifiers (UDI), and monitor regulatory compliance for all equipment.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* UDI Generator Co-pilot Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary" /> UDI Generator Co-pilot</CardTitle>
              <CardDescription>Input device details to generate a compliant Unique Device Identifier.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateUDI} className="space-y-4">
                <Input 
                  placeholder="Enter Machine Serial/Lot Number" 
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={!serialNumber}>
                  Generate UDI
                </Button>
              </form>
              <div className="mt-6 p-4 border rounded-md bg-secondary/30">
                <p className="text-sm font-medium mb-2">Generated UDI:</p>
                <code className="block break-all bg-secondary p-2 rounded text-sm">{udiCode}</code>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <CheckCircle className={`h-4 w-4 ${regulatoryStatus.includes('Ready') ? 'text-green-500' : 'text-orange-500'}`} />
                  Regulatory Status: <span className="font-semibold">{regulatoryStatus}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Inventory/Shopify Data Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Current Inventory Overview</CardTitle>
              <CardDescription>Real-time inventory pull from Shopify, linked to required UDI status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Stock (Shopify)</TableHead>
                    <TableHead>Pending UDI</TableHead>
                    <TableHead>Regulatory Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.pending}</TableCell>
                      <TableCell className={item.pending > 0 ? "text-orange-500" : "text-green-500"}>
                        {item.pending > 0 ? 'Action Required' : 'Compliant'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                <HardHat className="h-3 w-3" />
                Data displayed is a placeholder. Full Shopify API integration is required for live data.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UDIProgram;
