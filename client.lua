local display = true
local selectedPosition = "right"
local soundActive = true
local nuiReady = false
function Notify(text, time, notifytype, options)
    if display then
        if options then
            if notifytype == "twt" then
                if options.twtName then
                    text = "<span style='color:#55acee'>@"..options.twtName.."</span>: "..text
                end
            end
            if notifytype == "msg" then
                if options.msgNumber then
                    text = "<span style='color:#ffae00'>"..options.msgNumber.."</span>: "..text
                end
            end
        end
        SendNUIMessage({
            type = 'ADD_NOTIFICATION',
            notifytype = notifytype,
            text = text,
            time = time,
            selectedPosition = selectedPosition,
        })
    end

end

RegisterNUICallback('Ready', function()
    nuiReady = true
    SendNUIMessage({
        type = 'DISPLAY_TITLES',
        display = Config.DisplayTitles,
    })

    SendNUIMessage({
        type = "SET_TITLES_LANGUAGE",
        texts = Config.Titles
    })
end)

CreateThread(function()
	while true do
		Wait(0)
		if NetworkIsSessionStarted() then
            while not nuiReady do
                Citizen.Wait(0)
            end
			TriggerServerEvent('xC_Notification:RequestPreferences')
			return
		end
	end
end)



RegisterNetEvent('xC_Notification')
AddEventHandler('xC_Notification', function(text, time, notifytype, options)
	Notify(text, time, notifytype, options)
end)
if Config.TestCommands  then
    RegisterCommand('checknotify', function()
        Notify('xCoore Test', 5000, 'check')
    end)
    
    RegisterCommand('infonotify', function()
        Notify('xCoore Test', 5000, 'info')
    end)
    
    RegisterCommand('annnotify', function()
        Notify('xCoore Test', 5000, 'ann')
    end)
    
    RegisterCommand('msgnotify', function()
        Notify('xCoore Test', 5000, 'msg', {
            msgNumber = 1211, 
        })
    end)
    RegisterCommand('twtnotify', function()
        Notify('xCoore Test', 5000, 'twt', {
            twtName = "Test", 
        })
    end)
    RegisterCommand('callnotify', function()
        Notify('xCoore Test', 5000, 'call')
    end)
    RegisterCommand('banknotify', function()
        Notify('xCoore Test', 5000, 'xcbank')
    end)
    RegisterCommand('billnotify', function()
        Notify('xCoore Test', 5000, 'bill')
    end)
    
    RegisterCommand('lspdnotify', function()
        Notify('xCoore Test', 5000, 'lspd')
    end)
    
    RegisterCommand('savenotify', function()
        Notify('xCoore Test', 5000, 'save')
    end)
    
    RegisterCommand('errornotify', function()
        Notify('xCoore Test', 5000, 'error')
    end)

    RegisterCommand('emsnotify', function()
        Notify('xCoore Test', 5000, 'ems')
    end)
end


RegisterNUICallback('Close', function()
    SetNuiFocus(false, false)
    TriggerScreenblurFadeOut(0)
end)



RegisterNUICallback('SelectPosition', function(data, cb)
    local position = data.position
    selectedPosition = position
    SendNUIMessage({
		type = 'ON_NOTIFICATION_POSITION_CHANGE',
        selectedPosition  = selectedPosition,
	})
    TriggerServerEvent('xC_Notification:server:SavePosition', position)
end)


RegisterNUICallback('DisableSound', function(data, cb)
    soundActive = false
    SendNUIMessage({
		type = 'TOGGLE_SOUND',
        soundActive  = soundActive,
	})
    TriggerServerEvent('xC_Notification:server:SaveSound', soundActive)
end)


RegisterNUICallback('EnableSound', function(data, cb)
    soundActive = true
    SendNUIMessage({
		type = 'TOGGLE_SOUND',
        soundActive  = soundActive,
	})
    TriggerServerEvent('xC_Notification:server:SaveSound', soundActive)
end)


RegisterNUICallback('HideNotifications', function(data, cb)
    display = false
    SendNUIMessage({
		type = 'TOGGLE_NOTIFICATIONS',
        display  = display,
	})
    TriggerServerEvent('xC_Notification:server:SaveDisplay', display)
end)

RegisterNetEvent('xC_Notification:client:GetPreferences')
AddEventHandler('xC_Notification:client:GetPreferences', function(preferences)
    selectedPosition = preferences.position
    SendNUIMessage({
		type = 'ON_NOTIFICATION_POSITION_CHANGE',
        selectedPosition  = preferences.position,
	})
    display = preferences.display

    SendNUIMessage({
		type = 'TOGGLE_NOTIFICATIONS',
        display  = preferences.display,
	})
    soundActive = preferences.sound
    SendNUIMessage({
		type = 'TOGGLE_SOUND',
        soundActive  = soundActive,
	})
end)

RegisterNUICallback('ActiveNotifications', function(data, cb)
    display = true
    SendNUIMessage({
		type = 'TOGGLE_NOTIFICATIONS',
        display  = display,
	})
    TriggerServerEvent('xC_Notification:server:SaveDisplay', display)

end)


RegisterCommand(Config.SettingsCommand, function()
    SendNUIMessage({
		type = 'ENABLE_NOTIFY_SETTINGS',
	})
    TriggerScreenblurFadeIn(0)
    SetNuiFocus(true, true)
end)