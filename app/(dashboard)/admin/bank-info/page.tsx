"use client";


import Button from "@/app/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { Bank } from "@/app/types";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const BankInfoManagement = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [bankToDeleteId ,setbankToDeleteId] = useState("");

    const fetchBanks = async () => {
            try {
                const data = await getAllBanks();
                setBanks(data)
            } catch(error) {
                console.error("Failed to fetch bank data", error)
            }
        };
    

    const handleCloseModal = () => {
        setisModalOpen(false)
        setSelectedBank(null)
    };

    const handleEdit = (bank: Bank) => {
                setSelectedBank(bank);
                setisModalOpen(true);
    }

    const handleDelete = (id: string) => {
        setbankToDeleteId(id);
        setIsDeleteModalOpen(true)
    }

     const handleDeleteConfirm = async () => {
                if (!bankToDeleteId) return;
                try {
                    await deleteBank(bankToDeleteId);
                    fetchBanks();
                    toast.success("Bank info deleted successfuly!");
                    setIsDeleteModalOpen(false);
                    setbankToDeleteId("");
                } catch (error) {
                    console.error("Failed to delete bank info", error);
                    toast.error("Failed to delete bank info");
                }
            };




     useEffect(() => {
                fetchBanks();
            } , []);

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
            <div>
            <h1 className="font-bold text-2xl">Bank Info Management</h1>
            <p className="opacity-50">Manage destination accounts for customer transfers.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setisModalOpen(true)}>
            <FiPlus size={24} /> 
            Add Bank Account
            </Button>
        </div>
        <BankInfoList banks={banks} onEdit={handleEdit} onDelete={handleDelete} />
        <BankInfoModal 
        isOpen={isModalOpen} 
        onSuccess={fetchBanks} 
        onClose={handleCloseModal}
        bank={selectedBank}
        />
        <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeleteConfirm}
        />
        </div>
    );
};

export default BankInfoManagement;