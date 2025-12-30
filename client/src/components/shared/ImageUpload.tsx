"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  label?: string;
  name: string;
  defaultValue?: string | null;
  onChange?: (file: File | null) => void;
  onUrlChange?: (url: string) => void;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  className?: string;
}

export function ImageUpload({
  label = "Image",
  name,
  defaultValue,
  onChange,
  onUrlChange,
  accept = "image/*",
  multiple = false,
  required = false,
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      onChange?.(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null);
    onUrlChange?.("");
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setPreview(url);
      onUrlChange?.(url);
    } else {
      setPreview(null);
      onUrlChange?.("");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {/* File Upload */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            id={`${name}-file`}
            name={`${name}-file`}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        {/* URL Input (fallback) */}
        <div className="text-sm text-muted-foreground">Or enter image URL:</div>
        <Input
          id={`${name}-url`}
          name={name}
          type="url"
          placeholder="https://example.com/image.jpg"
          defaultValue={defaultValue || ""}
          onChange={handleUrlChange}
          className={file ? "opacity-50" : ""}
          disabled={!!file}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 border rounded-md overflow-hidden bg-muted">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Hidden input for form submission (will be handled by FormData) */}
      {file && (
        <input
          type="hidden"
          name={`${name}-uploaded`}
          value="true"
        />
      )}
    </div>
  );
}

