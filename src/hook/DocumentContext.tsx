import { createContext, useContext, useState } from "react";
import type { AddDocument, DocumentsList } from "../types/DocumentType";
import {
  addDocumentApi,
  contentDocumentApi,
  deleteDocumentApi,
  detailDocumentApi,
  fetchDocumentApi,
  updateDocumentApi,
} from "../services/Api_Document";

type DocumentContextType = {
  loading: boolean;
  documentsList: DocumentsList[];
  detailDocuments: DocumentsList | null;
  contentDocuments: string | null;
  fetchDocument: (key?: string) => Promise<void>;
  detailDocument: (id: string) => Promise<void>;
  contentDocument: (id: string) => Promise<void>;
  addDocument: (data: AddDocument) => Promise<boolean>;
  updateDocument: (id: string, data: AddDocument) => Promise<boolean>;
  deleteDocument: (id: string) => Promise<boolean>;
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export const DocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [documentsList, setDocuments] = useState<DocumentsList[]>([]);
  const [detailDocuments, setDetailDocuments] = useState<DocumentsList | null>(
    null,
  );
  const [contentDocuments, setContentDocuments] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchDocument = async (search?: string) => {
    setLoading(true);
    try {
      const data = await fetchDocumentApi({ search });
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  };

  const detailDocument = async (id: string) => {
    const data = await detailDocumentApi(id);
    setDetailDocuments(data);
  };

  const contentDocument = async (id: string) => {
    const data = await contentDocumentApi(id);
    setContentDocuments(data);
  };

  const addDocument = async (data: AddDocument) => {
    const res = await addDocumentApi(data);
    if (res.status === 201) {
      fetchDocument();
      return true;
    }
    return false;
  };

  const updateDocument = async (id: string, data: AddDocument) => {
    const res = await updateDocumentApi(id, data);
    if (res.status === 200) {
      fetchDocument();
      return true;
    }
    return false;
  };

  const deleteDocument = async (id: string) => {
    const res = await deleteDocumentApi(id);
    if (res.status === 200) {
      fetchDocument();
      return true;
    }
    return false;
  };

  return (
    <DocumentContext.Provider
      value={{
        loading,
        documentsList,
        detailDocuments,
        contentDocuments,
        fetchDocument,
        detailDocument,
        contentDocument,
        addDocument,
        updateDocument,
        deleteDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const UseDocument = () => {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocument phải nằm trong DocumentProvider");
  return ctx;
};
