import Countries from './mock/countries/Countries';

export function buildCountries() {
    const countries = Countries.map(country => {
        return {
            id: country.name,
            ...country,
            area: reduceAreaDetail(convertGeojsonMultyPolygon(JSON.parse(country.area))),
            center: convertGeojsonPoint(JSON.parse(country.center)),
            capital: {
                ...country.capital,
                center: convertGeojsonPoint(JSON.parse(country.capital.center))
            }
        }
    })

    return countries;
}

export function reduceAreaDetail(areas) {
    let newAreas = [];

    areas.forEach(area => {
        if(area.length < 20) { //Small area, we don't need to reduce the detail
            newAreas.push(area)    
            return;
        }

        let newArea = area.filter((point, idx) => {
            if(idx === 0 || idx === area.length-1) //Keep first and last points
                return true;

            return (idx % 15) === 0;
        })

        newAreas.push(newArea)
    })

    return newAreas;
}

export function convertGeojsonMultyPolygon(geojson) {
    let areas = geojson.geometries[0].coordinates
        .reduce((a,b) => [...a, ...b]);
    
    areas = areas.map(area => area.map((point) => {
        return { lng:point[0], lat:point[1]}
    }))

    return areas;
};

export function convertGeojsonPoint(geojson) {
    return {
        lng:geojson.coordinates[0],
        lat:geojson.coordinates[1]
    };
};