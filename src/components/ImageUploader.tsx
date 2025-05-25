import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import '../assets/ImageUploader.css'

interface ImageUploaderProps {
  onSelectedImage: (base64String: string) => void;
  labelDefaultProp?: string; // Prop opcional para personalizar el texto del botón
  base64StringProp?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onSelectedImage, 
  labelDefaultProp="Selecciona una imagen.",
  base64StringProp=""
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setPreviewUrl(base64StringProp || null);
    if (base64StringProp === "") {
      handleRemoveImage()
    }
  }, [base64StringProp]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setPreviewUrl(null);
        return;
      }

      // Usar FileReader para convertir la imagen a data URL (Base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        // Almacenar en localStorage
        try {
          onSelectedImage(base64String);
        } catch (error) {
          console.error("Error al guardar en localStorage:", error);
          // Podría ser QuotaExceededError si la imagen es muy grande
          alert("No se pudo guardar la imagen en el almacenamiento local. Puede que sea demasiado grande.");
          // Limpiar para no dejar un estado inconsistente
          setPreviewUrl(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };
      reader.onerror = (error) => {
        console.error("Error al leer el archivo:", error);
        alert("Ocurrió un error al procesar la imagen.");
      };
      reader.readAsDataURL(file); // Comienza la lectura del archivo
    } else {
      handleRemoveImage()
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className='image-uploader-content'>
      <div onClick={() => fileInputRef.current?.click()}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className='input-file'
        />

        {previewUrl && (
          <div className='content-preview'>
            <img src={previewUrl} alt="Vista previa" />
          </div>
        )}

        {!previewUrl && (
          <p className='label-load'>
            {
              base64StringProp
                ? "Cargando imagen desde almacenamiento..." 
                : labelDefaultProp
            }
          </p>
        )}
      </div>
      { previewUrl && (
        <div className='content-button'>
          <button className='button' onClick={handleRemoveImage}> 
            Eliminar 
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;