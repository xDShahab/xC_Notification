local preferences = {}


function GetPreferencesData()
    local json_data = LoadResourceFile(GetCurrentResourceName(),  './preferences.json')
    if(json_data == '')then
        json_data = {}
    else
        json_data = json.decode(json_data)
    end
    return json_data
end

function SaveToPreferencesData(data)
    SaveResourceFile(GetCurrentResourceName(),'preferences.json', json.encode(data), -1)
end

Citizen.CreateThread(function()
    Citizen.Wait(1000)
    preferences = GetPreferencesData()
end)

function GetSteamId(playerId)
	local identifier
	for k,v in ipairs(GetPlayerIdentifiers(playerId)) do
		if string.match(v, 'steam:') then
			identifier = v
			break
		end
	end
   
    if identifier == nil then
        for k,v in ipairs(GetPlayerIdentifiers(playerId)) do
            if string.match(v, 'license:') then
                identifier = v
                break
            end
        end
    end
    if identifier == nil then
        for k,v in ipairs(GetPlayerIdentifiers(playerId)) do
            if string.match(v, 'license2:') then
                identifier = v
                break
            end
        end
    end
    return identifier
end

RegisterServerEvent('xC_Notification:server:SavePosition')
AddEventHandler('xC_Notification:server:SavePosition', function(position)
    local src = source
    local identifier = GetSteamId(src)
    if preferences[identifier] == nil then
        preferences[identifier] = {
            display = true,
            position = position,
            sound = true,
        }
    else
        preferences[identifier].position = position
    end
    SaveToPreferencesData(preferences)
    TriggerClientEvent('xC_Notification:client:GetPreferences', src, preferences[identifier])
end)

RegisterServerEvent('xC_Notification:RequestPreferences')
AddEventHandler('xC_Notification:RequestPreferences', function()
    local src = source
    local identifier = GetSteamId(src)
    if preferences[identifier] == nil then
        preferences[identifier] = {
            display = true,
            position = "right",
            sound = true,
        }
    end
    SaveToPreferencesData(preferences)
    TriggerClientEvent('xC_Notification:client:GetPreferences', src, preferences[identifier])
end)

RegisterServerEvent('xC_Notification:server:SaveDisplay')
AddEventHandler('xC_Notification:server:SaveDisplay', function(display)
    local src = source
    local identifier = GetSteamId(src)
    if preferences[identifier] == nil then
        preferences[identifier] = {
            display = display,
            position = "right",
            sound = true,
        }
    else
        preferences[identifier].display = display
    end
    SaveToPreferencesData(preferences)
    TriggerClientEvent('xC_Notification:client:GetPreferences', src, preferences[identifier])
end)

RegisterServerEvent('xC_Notification:server:SaveSound')
AddEventHandler('xC_Notification:server:SaveSound', function(sound)
    local src = source
    local identifier = GetSteamId(src)
    if preferences[identifier] == nil then
        preferences[identifier] = {
            display = true,
            position = "right",
            sound = sound,
        }
    else
        preferences[identifier].sound = sound
    end
    SaveToPreferencesData(preferences)
    TriggerClientEvent('xC_Notification:client:GetPreferences', src, preferences[identifier])
end)