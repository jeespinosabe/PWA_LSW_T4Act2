import * as mongoose from 'mongoose';

// Campos de cada lista que vive dentro de un negocio
export const COLECCIONES = {
    info_ad: {
        Etiqueta: { type: String, required: true },
        Valor:    { type: String, required: true },
        Seccion:  { type: String }
    },
    archivos: {
        DesArchivo:  { type: String, required: true },
        RutaArchivo: { type: String, required: true },
        TipoArchivo: { type: String }
    },
    telefonos: {
        Numero:    { type: String, required: true },
        Tipo:      { type: String },
        Extension: { type: String }
    },
    dir_webs: {
        URL:         { type: String, required: true },
        Descripcion: { type: String },
        Tipo:        { type: String }
    },
    domicilios: {
        Calle:   { type: String, required: true },
        NumExt:  { type: String },
        NumInt:  { type: String },
        Colonia: { type: String },
        CP:      { type: String },
        Ciudad:  { type: String },
        Estado:  { type: String },
        Pais:    { type: String }
    }
};

// Campos propios de un negocio (las listas se editan por separado)
export const CAMPOS_NEGOCIO = ['IdNegocioOK', 'IdNegocioBK', 'DesNegocio', 'Alias'];

const listas = Object.fromEntries(
    Object.entries(COLECCIONES).map(([nombre, campos]) => [nombre, [new mongoose.Schema(campos)]])
);

const negocioSchema = new mongoose.Schema({
    IdNegocioOK: { type: String, required: true },
    IdNegocioBK: { type: String },
    DesNegocio:  { type: String, required: true },
    Alias:       { type: String },
    ...listas
});

const institutoSchema = new mongoose.Schema({
    IdInstitutoOK:      { type: String, required: true },
    IdInstitutoBK:      { type: String },
    DesInstituto:       { type: String },
    Alias:              { type: String },
    Matriz:             { type: String },
    Giro:               { type: String },  // 👈 en BD es Giro, no IdTipoGiroOK
    IdInstitutoSupOK:   { type: String },
    cat_negocios:       [negocioSchema],
    detail_row: {
        Activo:          { type: String, default: 'S' },
        Borrado:         { type: String, default: 'N' },
        detail_row_reg:  { type: Array,  default: [] }
    }
}, { collection: 'cat_institutos' });

export default mongoose.model('cat_institutos', institutoSchema);
