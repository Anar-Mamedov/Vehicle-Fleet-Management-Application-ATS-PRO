import React, { useState, useCallback, useEffect } from "react";
import { LoadScript, GoogleMap, Autocomplete } from "@react-google-maps/api";
import { Input, message } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const libraries = ["places"];

const GoogleMaps = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext(); // React Hook Form kontrol ve setValue fonksiyonlarını kullanıyoruz

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setPosition(userLocation);
          setValue("coordinates", `${userLocation.lat}, ${userLocation.lng}`);
          if (map) {
            map.setCenter(userLocation);
            const marker = new window.google.maps.Marker({
              position: userLocation,
              map: map,
            });
            map.markers = [marker];

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: userLocation }, (results, status) => {
              if (status === "OK" && results[0]) {
                setValue("searchQuery", results[0].formatted_address);
              } else {
                setValue("searchQuery", "Adres bulunamadı");
              }
            });
          }
        },
        () => {
          const defaultPosition = { lat: -3.745, lng: -38.523 };
          setPosition(defaultPosition);
          setValue("coordinates", `${defaultPosition.lat}, ${defaultPosition.lng}`);
        }
      );
    } else {
      const defaultPosition = { lat: -3.745, lng: -38.523 };
      setPosition(defaultPosition);
      setValue("coordinates", `${defaultPosition.lat}, ${defaultPosition.lng}`);
    }
  }, [map, setValue]);

  const onLoad = useCallback(
    (map) => {
      map.markers = [];
      setMap(map);

      const locationButton = document.createElement("button");
      locationButton.textContent = "📍";
      locationButton.classList.add("custom-map-control-button");
      locationButton.style.position = "absolute";
      locationButton.style.top = "10px";
      locationButton.style.right = "10px";
      locationButton.style.background = "#fff";
      locationButton.style.border = "none";
      locationButton.style.cursor = "pointer";
      locationButton.style.fontSize = "24px";
      locationButton.style.padding = "10px";
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setPosition(userLocation);
              setValue("coordinates", `${userLocation.lat}, ${userLocation.lng}`);
              map.setCenter(userLocation);

              map.markers.forEach((marker) => marker.setMap(null));
              map.markers = [];

              const marker = new window.google.maps.Marker({
                position: userLocation,
                map: map,
              });

              map.markers.push(marker);

              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: userLocation }, (results, status) => {
                if (status === "OK" && results[0]) {
                  setValue("searchQuery", results[0].formatted_address);
                } else {
                  setValue("searchQuery", "Adres bulunamadı");
                }
              });
            },
            () => {
              alert("Konum alınamadı.");
            }
          );
        } else {
          alert("Tarayıcınız konum bilgisi sağlamıyor.");
        }
      });

      map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const newPosition = { lat, lng };

        setPosition(newPosition);
        setValue("coordinates", `${lat}, ${lng}`);
        map.setCenter(newPosition);

        map.markers.forEach((marker) => marker.setMap(null));
        map.markers = [];

        const marker = new window.google.maps.Marker({
          position: newPosition,
          map: map,
        });

        map.markers.push(marker);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newPosition }, (results, status) => {
          if (status === "OK" && results[0]) {
            setValue("searchQuery", results[0].formatted_address);
          } else {
            setValue("searchQuery", "Adres bulunamadı");
          }
        });
      });
    },
    [setValue]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setPosition(newPosition);
        setValue("coordinates", `${newPosition.lat}, ${newPosition.lng}`);
        map.setCenter(newPosition);

        map.markers.forEach((marker) => marker.setMap(null));
        map.markers = [];

        const marker = new window.google.maps.Marker({
          position: newPosition,
          map: map,
        });

        map.markers.push(marker);

        setValue("searchQuery", place.formatted_address || place.name);
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleCoordinatesChange = (e) => {
    const value = e.target.value;
    setValue("coordinates", value);

    const [lat, lng] = value.split(",").map((coord) => parseFloat(coord.trim()));
    if (!isNaN(lat) && !isNaN(lng)) {
      const newPosition = { lat, lng };
      setPosition(newPosition);
      map.setCenter(newPosition);

      map.markers.forEach((marker) => marker.setMap(null));
      map.markers = [];

      const marker = new window.google.maps.Marker({
        position: newPosition,
        map: map,
      });

      map.markers.push(marker);

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results[0]) {
          setValue("searchQuery", results[0].formatted_address);
        } else {
          setValue("searchQuery", "Adres bulunamadı");
        }
      });
    } else {
      message.error("Geçersiz koordinatlar");
    }
  };

  return (
    <>
      {position && (
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
          <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
            <Controller
              name="searchQuery"
              control={control}
              render={({ field }) => <Input.Search placeholder="Konum giriniz" enterButton="Ara" size="large" {...field} style={{ marginBottom: "10px" }} />}
            />
          </Autocomplete>
          <Controller
            name="coordinates"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Koordinatlar giriniz (örneğin: 40.7128, -74.0060)"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleCoordinatesChange(e);
                }}
                style={{ marginBottom: "20px", display: "none" }}
              />
            )}
          />
          <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={10} onLoad={onLoad} onUnmount={onUnmount}></GoogleMap>
        </LoadScript>
      )}
    </>
  );
};

export default GoogleMaps;
