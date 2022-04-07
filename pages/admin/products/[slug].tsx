import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { DashboardLayout, ProductSlideShow } from 'components'
import { IProduct } from 'interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
/* import { dbProducts } from '../../../database'; */
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, CircularProgress, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, ListItem, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
/* import { shopApi } from 'api';
import { Product } from 'models'; */
import { useRouter } from 'next/router';
import { foodApi } from 'api';
import { Product } from 'models';
import { dbProducts, SHOP_CONSTANTS } from 'database';

interface Props {
    product: IProduct;
}

interface FormData {
    _id?       : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    menu       : string;
    slug       : string;
    tags       : string[];
    title      : string;
}



const ProductAdminPage: FC<Props> = ({ product }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newTagValue, setNewTagValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isSaveImgCloud, setIsSaveImgCloud] = useState(false);
    const [getMenu, setMenu] = React.useState(product.menu || '');

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    });

    const handleChangeCategoria = (event: SelectChangeEvent) => {
        const men =  event.target.value;
        setValue('menu', men , { shouldValidate: true });
        setMenu(men as any);
    };

    useEffect(() => {
        // Actualizar SLUG de acuerdo al titulo del producto
        const subscription = watch((value, { name, type }) => {
            if (name === 'title') {
                const newSlug = value.title?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLowerCase() || '';

                setValue('slug', newSlug);
            }

        })
        return () => subscription.unsubscribe();
    }, [watch, setValue])


    const onNewTag = () => {
        const newTag = newTagValue.trim().toLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');
        if (currentTags.includes(newTag)) {
            return;
        }
        currentTags.push(newTag);
    }

    const onDeleteTag = (tag: string) => {
        const newListTag = getValues('tags').filter(t => t !== tag);
        setValue('tags', newListTag, { shouldValidate: true });
    }

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsSaveImgCloud(true);
        if (!target.files || target.files.length === 0) {
            setIsSaveImgCloud(false);
            return
        }


        try {
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await foodApi.post<{ message: string }>('/admin/upload', formData);

                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
                setIsSaveImgCloud(false);
            }
        } catch (error) {
            setIsSaveImgCloud(false);
            console.log(error);
        }
    }

    const onDeleteImage = (image: string) => {
        const newImages = getValues('images').filter(i => i !== image);
        setValue('images', newImages, { shouldValidate: true });
    }

    const formSubmit = async (form: FormData) => {

        if (form.images.length < 2) return alert('Debe subir al menos 2 imagenes');

        setIsSaving(true);

        try {
            const { data } = await foodApi({
                method: form._id ? 'PUT' : 'POST',
                url: `/admin/products`,
                data: form
            })

            if (!form._id) {
                // TODO: recargamos la pagina
                router.replace(`/admin/products/${form.slug}`);
            } else {
                setIsSaving(false);
            }

        } catch (error) {
            alert('Error al guardar el producto');
            setIsSaving(false);
            console.log(error)
        }
    }
    return (
        <DashboardLayout title={'Producto'} pageDescripcion={'Detalles del producto'}>
            <form onSubmit={handleSubmit(formSubmit)} noValidate>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color="primary"
                        startIcon={<SaveOutlined />}
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSaving}
                    >
                        Guardar
                    </Button>
                </Box>
                <Grid container spacing={2}>


                    <Grid item xs={12} sm={6}>
                        <Card sx={{ p: 2 }}>
                            <Typography variant='h1' sx={{ mb: 1 }}>Producto</Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={2}>
                                {/* Data */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Título"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        {...register('title', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                    <TextField
                                        label="Slug - URL"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        {...register('slug', {
                                            required: 'Este campo es requerido',
                                            validate: (val) => val.trim().includes(' ') ? 'No puede contener espacios' : undefined
                                        })}
                                        error={!!errors.slug}
                                        helperText={errors.slug?.message}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Precio"
                                        type='number'
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        {...register('price', {
                                            required: 'Este campo es requerido',
                                            min: { value: 0, message: 'Mínimo 0' }
                                        })}
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Inventario"
                                        type='number'
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        {...register('inStock', {
                                            required: 'Este campo es requerido',
                                            min: { value: 0, message: 'Mínimo 0' }
                                        })}
                                        error={!!errors.inStock}
                                        helperText={errors.inStock?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            type="text"
                                            value={getMenu}
                                            label="Categoria"
                                            onChange={handleChangeCategoria}
                                        >
                                            <MenuItem value={'Arepas'}>Arepas</MenuItem>
                                            <MenuItem value={'Pizza'}>Pizza</MenuItem>
                                            <MenuItem value={'Hog dog'}>Hog dog</MenuItem>
                                            <MenuItem value={'Hamburguesas'}>Hamburguesas</MenuItem>
                                            <MenuItem value={'Bebidas'}>Bebidas</MenuItem>
                                            <MenuItem value={'Combos'}>Combos</MenuItem>
                                            <MenuItem value={'Adicionales'}>Adicionales</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* Tags e imagenes */}
                                <Grid item xs={12}>

                                    <TextField
                                        label="Etiquetas"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        helperText="Presiona [spacebar] para agregar"
                                        value={newTagValue}
                                        onChange={({ target }) => setNewTagValue(target.value)}
                                        onKeyUp={({ code }) => code === 'Space' && onNewTag()}
                                    />

                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        listStyle: 'none',
                                        p: 0,
                                        m: 0,
                                    }}
                                        component="ul">
                                        {
                                            getValues('tags').map((tag) => {

                                                return (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        onDelete={() => onDeleteTag(tag)}
                                                        color="primary"
                                                        size='small'
                                                        sx={{ ml: 1, mt: 1 }}
                                                    />
                                                );
                                            })}
                                    </Box>

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Descripción"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        sx={{ mb: 1 }}
                                        {...register('description', {
                                            required: 'Este campo es requerido'
                                        })}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                </Grid>

                            </Grid>

                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ p: 2 }}>
                            <Typography variant='h1' sx={{ mb: 1 }}>Images</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box display='flex' flexDirection="column">
                                <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                                {
                                    isSaveImgCloud ? (
                                        <Box display="flex" justifyContent="center" className="fadeIn">
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <Button
                                            color="primary"
                                            fullWidth
                                            startIcon={<UploadOutlined />}
                                            sx={{ mb: 3 }}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Cargar imagen
                                        </Button>
                                    )
                                }


                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/png, image/jpeg, image/jpg, image/gif"
                                    style={{ display: 'none' }}
                                    onChange={onFilesSelected}
                                />

                                <Chip
                                    label="Es necesario al 2 imagenes"
                                    color='error'
                                    variant='outlined'
                                    sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
                                />

                                <Grid container spacing={2}>
                                    {/* <ProductSlideShow images={getValues('images')} /> */}
                                    {
                                        getValues('images').map(img => (
                                            <Grid item xs={4} sm={3} key={img}>
                                                <Card>
                                                    <CardMedia
                                                        component='img'
                                                        className='fadeIn'
                                                        image={`${img}`}
                                                        alt={img}
                                                    />
                                                    <CardActions>
                                                        <Button
                                                            fullWidth
                                                            color="error"
                                                            onClick={() => onDeleteImage(img)}
                                                        >
                                                            Borrar
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>

                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </DashboardLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product: IProduct | null;

    if (slug === 'new') {
        // Creo un nuevo producto con todos los campos vacios
        const temProduct = JSON.parse(JSON.stringify(new Product()));
        delete temProduct._id; // Elimino el id porque no lo necesito
        temProduct.images = []; // Creo unas imagenes por defecto
        product = temProduct; // Asigno el producto para que se muestre con sus valores vacios
    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }


    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage


