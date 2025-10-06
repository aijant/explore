import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem as MenuOption,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";
import AddCompanyDialog from "./AddCompanyDialog";

import {
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "@store/services/company.service";

interface Company {
  uuid?: string;
  companyName: string;
  address: string;
  dotNumber: string;
  smsNotifications: string;
  terminalTimeZone: string;
  documents?: any[];
  status?: boolean;
  createdDate?: string;
}

const CompanyContent = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const { data, refetch } = useGetCompanyQuery({});
  const companies: Company[] = Array.isArray(data?.content) ? data.content : [];

  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    company: Company
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompany(company);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    if (selectedCompany) {
      setEditMode(true);
      setDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleAddCompany = async (formData: any) => {
    try {
      const data = new FormData();
      const companyPayload = {
        companyName: formData.company?.companyName || "",
        street: formData.company?.street || "",
        city: formData.company?.city || "",
        dot: formData.company?.dot || "",
        homeTerminalTimeZone: formData.company?.homeTerminalTimeZone || "",
        cycleRule: formData.company?.cycleRule || "",
        cargoType: formData.company?.cargoType || "",
        break30MinException: formData.company?.break30MinException || false,
      };

      data.append("company", JSON.stringify(companyPayload));

      if (Array.isArray(formData.documents)) {
        formData.documents.forEach((doc: any) => {
          if (doc.file instanceof File) {
            data.append("documentName", doc.documentName);
            data.append("customName", doc.customName || "");
            data.append(
              "expirationDate",
              new Date(doc.expirationDate).toISOString()
            );
            data.append("file", doc.file, doc.file.name);
          }
        });
      }

      if (editMode && selectedCompany) {
        await updateCompany({
          uuid: selectedCompany.uuid!,
          body: data,
        }).unwrap();
        toast.success("Company updated!");
      } else {
        await createCompany(data).unwrap();
        toast.success("Company created!");
      }

      setDialogOpen(false);
      setEditMode(false);
      setSelectedCompany(null);
      refetch();
    } catch (err: any) {
      console.error("Company save error:", err);
      toast.error("Error saving company!");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Company",
      "Address",
      "DOT #",
      "SMS Notifications",
      "Time Zone",
      "Documents Count",
      "Status",
    ];

    const rows = companies.map((c) => [
      c.companyName,
      c.city,
      c.dot,
      c.smsNotifications,
      c.homeTerminalTimeZone,
      c.documents?.length ?? 0,
      c.status ? "Active" : "Inactive",
    ]);

    const csvContent = [headers, ...rows]
      .map((r) => r.map((val) => `"${val ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `companies_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const filteredCompanies = companies.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#121a26", color: "white" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 4,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          placeholder="Search by Company Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350, bgcolor: "#1e2630", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setDialogOpen(true);
              setEditMode(false);
              setSelectedCompany(null);
            }}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 120,
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            + Add Company
          </Button>

          <Button
            variant="outlined"
            onClick={handleExportCSV}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 120,
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            Export CSV
          </Button>

          <IconButton sx={{ color: "white" }} onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: "#1e2630" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "COMPANY ↑",
                "ADDRESS",
                "DOT #",
                "SMS NOTIFICATIONS",
                "HOME TERMINAL TIME ZONE",
                "DOCUMENTS",
                "STATUS",
                "",
              ].map((header, i) => (
                <TableCell key={i} sx={{ color: "white", fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies.map((c) => (
              <TableRow key={c.uuid}>
                <TableCell sx={{ color: "white" }}>{c.companyName}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {c.city} {c.street}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{c.dot}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {c.smsNotifications || "None"}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {c.homeTerminalTimeZone}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {c.documents?.length ?? ' '}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {c.status
                    ? `Active from ${new Date(
                        c.createdDate!
                      ).toLocaleDateString()}`
                    : "Inactive"}
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => handleMenuOpen(e, c)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filteredCompanies.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ color: "white" }}>
                  No companies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuOption onClick={handleEdit}>Edit</MenuOption>
      </Menu>

      <AddCompanyDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditMode(false);
          setSelectedCompany(null);
        }}
        onConfirm={handleAddCompany}
        initialData={editMode ? selectedCompany : null}
      />
    </Box>
  );
};

export default CompanyContent;
