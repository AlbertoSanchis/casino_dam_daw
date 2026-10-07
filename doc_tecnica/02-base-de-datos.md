# 02 · Base de datos

Base de datos: `casino` · Motor: InnoDB · Codificación: `utf8mb4\_spanish\_ci`


## Diagrama

```
┌──────────────────────────┐        
│ usuarios                 │         
├──────────────────────────┤      
│ PK id                    
│    usuario   (UNIQUE)    │    
│    password\_hash         │   
│    nombre                │         
│    rol (jugador|admin)   │         
│    saldo  DECIMAL(10,2)  │          
│    activo                │         
│    creado\_en             │                    
│    ultimo\_login          │          
└──────────────────────────┘
```

## Tabla `usuarios`

|Columna|Tipo|Notas|
|-|-|-|
|`id`|INT UNSIGNED PK AI||
|`usuario`|VARCHAR(50) UNIQUE|Nombre de login|
|`password\_hash`|VARCHAR(255)|Siempre `password\_hash()`; **nunca** texto plano ni MD5|
|`nombre`|VARCHAR(100)|El que aparece en "Bienvenido …"|
|`rol`|ENUM('jugador','admin')|Controla el acceso a `/admin`|
|`saldo`|DECIMAL(10,2)|`CHECK (saldo >= 0)`. DECIMAL, no FLOAT, para evitar errores de redondeo|
|`activo`|TINYINT(1)|Un usuario inactivo no puede iniciar sesión|
|`creado\_en`|DATETIME||
|`ultimo\_login`|DATETIME NULL|Se actualiza en cada login correcto|

## 

## Usuarios de prueba

|Usuario|Contraseña|Rol|Saldo|
|-|-|-|-|
|`admin`|`admin123`|admin|0|
|`jugador1`|`jugador123`|jugador|100|

> Cambiar estas contraseñas antes de cualquier despliegue fuera del aula.

## 

## Conexión (`includes/db.php`)

Para crear la base de datos
```

